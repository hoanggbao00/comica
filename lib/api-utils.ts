import type { WorkflowRequest } from "@/types/dify";
import { DIFY_CONFIG } from "./config";

export async function handleSSERequestAppRouter(body: WorkflowRequest, apiKey: string) {
  const encoder = new TextEncoder();

  const customReadable = new ReadableStream({
    async start(controller) {
      try {
        // Send initial connection message
        controller.enqueue(encoder.encode('data: {"event": "connection", "data": "connected"}\n\n'));

        const response = await fetch(`${DIFY_CONFIG.baseURL}/workflows/run`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorData = await response.text();
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                event: "error",
                data: {
                  message: `Dify API error: ${response.status} - ${errorData}`,
                },
              })}\n\n`,
            ),
          );
          controller.close();
          return;
        }

        const reader = response.body?.getReader();
        if (!reader) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                event: "error",
                data: { message: "Response body is not readable" },
              })}\n\n`,
            ),
          );
          controller.close();
          return;
        }

        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    event: "done",
                    data: "Stream completed",
                  })}\n\n`,
                ),
              );
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.trim() === "") continue;

              if (line.startsWith("data: ") || line.startsWith("event: ")) {
                controller.enqueue(encoder.encode(`${line}\n\n`));
              }
            }
          }
        } catch (streamError) {
          console.error("Stream error:", streamError);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                event: "error",
                data: { message: "Stream processing error" },
              })}\n\n`,
            ),
          );
        } finally {
          reader.releaseLock();
          controller.close();
        }
      } catch (error) {
        console.error("SSE request error:", error);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              event: "error",
              data: {
                message: error instanceof Error ? error.message : "Unknown SSE error",
              },
            })}\n\n`,
          ),
        );
        controller.close();
      }
    },
  });

  return new Response(customReadable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Cache-Control",
    },
  });
}
