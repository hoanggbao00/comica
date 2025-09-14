import { handleSSERequestAppRouter } from "@/lib/api-utils";
import { DIFY_CONFIG } from "@/lib/config";
import type { WorkflowRequest } from "@/types/dify";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: WorkflowRequest = await request.json();

    // Validate request body
    if (!body.inputs || !body.user) {
      return NextResponse.json({ error: "Missing required fields: inputs and user are required" }, { status: 400 });
    }

    const response_mode = body.response_mode || "blocking";

    const parsedInputs = body.inputs;
    const apiKey = parsedInputs.context ? DIFY_CONFIG.apiKeyGenerate! : DIFY_CONFIG.apiKeyCreateOverview!;

    if (response_mode === "streaming") {
      return handleSSERequestAppRouter(body, apiKey);
    }
    return handleBlockingRequestAppRouter(body, apiKey);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

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
    const apiKey = parsedInputs.context ? DIFY_CONFIG.apiKeyGenerate! : DIFY_CONFIG.apiKeyCreateOverview!;

    const requestData: WorkflowRequest = {
      inputs: parsedInputs,
      response_mode: "streaming",
      user,
    };

    return handleSSERequestAppRouter(requestData, apiKey);
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

// Handle blocking requests for App Router
async function handleBlockingRequestAppRouter(body: WorkflowRequest, apiKey: string) {
  try {
    const response = await fetch(`${DIFY_CONFIG.baseURL}/workflows/run`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Dify API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Blocking request error:", error);
    return NextResponse.json(
      {
        error: "Failed to process workflow",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
