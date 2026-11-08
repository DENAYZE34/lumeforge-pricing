import { NextRequest, NextResponse } from "next/server";
import { AiServiceError, getVideoJobStatus } from "@/lib/ai-service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  try {
    const job = await getVideoJobStatus(jobId);
    return NextResponse.json(job);
  } catch (error) {
    if (error instanceof AiServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
