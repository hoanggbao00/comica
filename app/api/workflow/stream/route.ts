import { handleSSERequestAppRouter } from "@/lib/api-utils";
import type { WorkflowRequest } from "@/types/dify";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const inputs = searchParams.get("inputs");
    const user = searchParams.get("user");

    if (!inputs || !user) {
      return NextResponse.json(
        {
          error: "Missing required query parameters: inputs and user are required",
        },
        { status: 400 },
      );
    }

    const parsedInputs = JSON.parse(inputs);

    const requestData: WorkflowRequest = {
      inputs: parsedInputs,
      response_mode: "streaming",
      user,
    };

    return handleSSERequestAppRouter(requestData);
  } catch (error) {
    console.error("SSE GET Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
