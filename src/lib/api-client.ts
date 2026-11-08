"use client";

import type { CameraState } from "@/lib/prompt-compiler";

export type VideoModel = "seedance-2.5" | "kling-3.0" | "veo-3.1";
export type VideoResolution = "720p" | "1080p" | "4k";
export type JobStatus = "queued" | "processing" | "ready" | "failed";

export interface VideoJob {
  id: string;
  status: JobStatus;
  videoUrl?: string;
  error?: string;
}

export class ApiClientError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiClientError";
  }
}

async function parseJsonOrThrow<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = (data && typeof data === "object" && "error" in data)
      ? String((data as { error: unknown }).error)
      : response.statusText;
    throw new ApiClientError(message, response.status);
  }
  return data as T;
}

export async function startVideoGeneration(params: {
  model: VideoModel;
  prompt: string;
  resolution: VideoResolution;
  camera: CameraState;
  referenceImages: string[];
}): Promise<VideoJob> {
  const response = await fetch("/api/generate/video", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: params.model,
      prompt: params.prompt,
      resolution: params.resolution,
      camera: params.camera,
      referenceImages: params.referenceImages,
    }),
  });

  return parseJsonOrThrow<VideoJob>(response);
}

export async function fetchJobStatus(jobId: string): Promise<VideoJob> {
  const response = await fetch(`/api/generate/video/${jobId}`);
  return parseJsonOrThrow<VideoJob>(response);
}

const TERMINAL_STATUSES: JobStatus[] = ["ready", "failed"];

/** Polls a job until it reaches a terminal status. Returns a cleanup function to cancel early. */
export function pollJobStatus(
  jobId: string,
  onUpdate: (job: VideoJob) => void,
  intervalMs = 3000
): () => void {
  let cancelled = false;

  const tick = async () => {
    if (cancelled) return;
    try {
      const job = await fetchJobStatus(jobId);
      if (cancelled) return;
      onUpdate(job);
      if (!TERMINAL_STATUSES.includes(job.status)) {
        setTimeout(tick, intervalMs);
      }
    } catch (error) {
      if (cancelled) return;
      onUpdate({
        id: jobId,
        status: "failed",
        error: error instanceof Error ? error.message : "Polling failed",
      });
    }
  };

  tick();

  return () => {
    cancelled = true;
  };
}
