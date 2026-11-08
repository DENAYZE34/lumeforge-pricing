import { NextRequest, NextResponse } from "next/server";
import {
  AiServiceError,
  generateChatCompletion,
  type ChatMessage,
  type ChatModel,
} from "@/lib/ai-service";

interface ChatRequestBody {
  model: ChatModel;
  messages: ChatMessage[];
}

function isValidBody(body: unknown): body is ChatRequestBody {
  if (!body || typeof body !== "object") return false;
  const record = body as Record<string, unknown>;
  return (
    typeof record.model === "string" &&
    Array.isArray(record.messages) &&
    record.messages.length > 0
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
      { error: "Expected { model, messages }" },
      { status: 400 }
    );
  }

  try {
    const result = await generateChatCompletion({
      model: body.model,
      messages: body.messages,
    });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof AiServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
