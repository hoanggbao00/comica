import { DIFY_CONFIG } from "@/lib/config";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workflowId = searchParams.get("workflow_id");
    // Validate request body
    if (!workflowId) {
      return NextResponse.json({ error: "Missing required fields: workflow_id is required" }, { status: 400 });
    }

    const apiKey = DIFY_CONFIG.apiKeyCreateOverview!;

    return handleBlockingRequestAppRouter(workflowId!, apiKey);
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

// Handle blocking requests for App Router
async function handleBlockingRequestAppRouter(id: string, apiKey: string) {
  try {
    const response = await fetch(`${DIFY_CONFIG.baseURL}/workflows/run/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
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
