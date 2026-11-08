import { NextRequest, NextResponse } from "next/server";
import { AiServiceError, startVideoJob, type VideoModel, type VideoResolution } from "@/lib/ai-service";
import { compileMasterPrompt, DEFAULT_CAMERA_STATE, type CameraState } from "@/lib/prompt-compiler";

interface VideoGenerationBody {
  model: VideoModel;
  prompt: string;
  resolution: VideoResolution;
  camera?: Partial<CameraState>;
  referenceImages?: string[];
}

function isValidBody(body: unknown): body is VideoGenerationBody {
  if (!body || typeof body !== "object") return false;
  const record = body as Record<string, unknown>;
  return (
    typeof record.model === "string" &&
    typeof record.prompt === "string" &&
    record.prompt.trim().length > 0 &&
    typeof record.resolution === "string"
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidBody(body)) {
    return NextResponse.json(
      { error: "Expected { model, prompt, resolution, camera?, referenceImages? }" },
      { status: 400 }
    );
  }

  const camera: CameraState = { ...DEFAULT_CAMERA_STATE, ...body.camera };
  const masterPrompt = compileMasterPrompt(body.prompt, camera);

  try {
    const job = await startVideoJob({
      model: body.model,
      prompt: masterPrompt,
      resolution: body.resolution,
      referenceImages: body.referenceImages,
    });
    return NextResponse.json(job);
  } catch (error) {
    if (error instanceof AiServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
