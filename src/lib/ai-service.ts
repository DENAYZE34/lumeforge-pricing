if (typeof window !== "undefined") {
  throw new Error("ai-service.ts must only be imported from server-side code");
}

const BASE_URL = process.env.APIMODELS_BASE_URL ?? "https://api.apimodels.app/v1";
const API_KEY = process.env.APIMODELS_API_KEY;
const DEBUG = process.env.DEBUG_APIMODELS === "1";

export class AiServiceError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "AiServiceError";
  }
}

function requireApiKey(): string {
  if (!API_KEY) {
    throw new AiServiceError(
      "APIMODELS_API_KEY is not configured on the server",
      500
    );
  }
  return API_KEY;
}

// Never log the full key — only enough to confirm which key is loaded.
function maskKey(key: string): string {
  if (key.length <= 8) return "***";
  return `${key.slice(0, 4)}...${key.slice(-4)} (len ${key.length})`;
}

function logRequest(method: string, url: string, headers: Record<string, string>) {
  if (!DEBUG) return;
  const safeHeaders = {
    ...headers,
    Authorization: headers.Authorization
      ? `Bearer ${maskKey(headers.Authorization.replace(/^Bearer /, ""))}`
      : undefined,
  };
  console.log(`[apimodels] ${method} ${url}`, { headers: safeHeaders });
}

async function apiFetch<T>(
  path: string,
  init: { method: "GET" | "POST"; body?: Record<string, unknown> },
  timeoutMs = 30_000
): Promise<T> {
  const key = requireApiKey();
  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${key}`,
    ...(init.body ? { "Content-Type": "application/json" } : {}),
  };

  logRequest(init.method, url, headers);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(url, {
      method: init.method,
      headers,
      body: init.body ? JSON.stringify(init.body) : undefined,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new AiServiceError("apimodels.app request timed out", 504, error);
    }
    throw new AiServiceError("apimodels.app request failed", 502, error);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    if (DEBUG) {
      console.log(`[apimodels] ${response.status} response for ${init.method} ${url}`, detail);
    }
    throw new AiServiceError(
      `apimodels.app returned ${response.status}: ${detail || response.statusText}`,
      response.status
    );
  }

  return (await response.json()) as T;
}

export type ChatModel = "claude-3-5-sonnet" | "gpt-4o";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionResult {
  id: string;
  model: string;
  content: string;
}

interface RawChatCompletionResponse {
  id: string;
  model: string;
  choices: { message: { content: string } }[];
}

export async function generateChatCompletion(params: {
  model: ChatModel;
  messages: ChatMessage[];
  temperature?: number;
}): Promise<ChatCompletionResult> {
  const data = await apiFetch<RawChatCompletionResponse>("/chat/completions", {
    method: "POST",
    body: {
      model: params.model,
      messages: params.messages,
      temperature: params.temperature ?? 0.7,
    },
  });

  const content = data.choices[0]?.message.content ?? "";
  return { id: data.id, model: data.model, content };
}

export type VideoResolution = "720p" | "1080p" | "4k";
export type VideoModel = "seedance-2.5" | "kling-3.0" | "veo-3.1";
export type JobStatus = "queued" | "processing" | "ready" | "failed";

export interface VideoJob {
  id: string;
  status: JobStatus;
  videoUrl?: string;
  error?: string;
}

interface RawVideoResponse {
  id: string;
  status: string;
  output_url?: string;
  error?: string;
}

function normalizeStatus(status: string): JobStatus {
  if (status === "completed" || status === "ready" || status === "succeeded") return "ready";
  if (status === "failed" || status === "error") return "failed";
  if (status === "processing" || status === "running") return "processing";
  return "queued";
}

export async function startVideoJob(params: {
  model: VideoModel;
  prompt: string;
  resolution: VideoResolution;
  referenceImages?: string[];
}): Promise<VideoJob> {
  const data = await apiFetch<RawVideoResponse>("/video/generations", {
    method: "POST",
    body: {
      model: params.model,
      prompt: params.prompt,
      resolution: params.resolution,
      ...(params.referenceImages?.length
        ? { reference_images: params.referenceImages }
        : {}),
    },
  });

  return {
    id: data.id,
    status: normalizeStatus(data.status),
    videoUrl: data.output_url,
    error: data.error,
  };
}

export async function getVideoJobStatus(jobId: string): Promise<VideoJob> {
  const data = await apiFetch<RawVideoResponse>(`/video/generations/${jobId}`, {
    method: "GET",
  });

  return {
    id: data.id,
    status: normalizeStatus(data.status),
    videoUrl: data.output_url,
    error: data.error,
  };
}
