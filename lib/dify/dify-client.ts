import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import apiNextJsClient from "../diffy-client";
import type {
  CustomError,
  RunWorkflowBlockingParams,
  RunWorkflowStreamingParams,
  SSECallbacks,
  SSEConnection,
  SSEMessage,
  WorkflowRequest,
  WorkflowResponse,
} from "./types";

export class DifyAPIClient {
  private axiosInstance: AxiosInstance;
  private eventSourceRef: EventSource | null = null;

  constructor() {
    this.axiosInstance = apiNextJsClient;
  }

  /**
   * Execute workflow with support for both blocking and streaming modes
   */
  async runWorkflow(params: RunWorkflowBlockingParams): Promise<WorkflowResponse>;
  async runWorkflow(params: RunWorkflowStreamingParams): Promise<EventSource>;
  async runWorkflow(
    params: RunWorkflowBlockingParams | RunWorkflowStreamingParams,
  ): Promise<WorkflowResponse | EventSource> {
    const requestData: WorkflowRequest = {
      inputs: params.inputs,
      response_mode: params.response_mode || "blocking",
      user: params.user,
    };

    if (requestData.response_mode === "streaming") {
      const streamingParams = params as RunWorkflowStreamingParams;
      return this.handleEventSourceSSE(requestData, {
        onMessage: streamingParams.onMessage,
        onError: streamingParams.onError,
        onComplete: streamingParams.onComplete,
        onOpen: streamingParams.onOpen,
      });
    }
    return this.handleRestRequest(requestData);
  }

  /**
   * Handle regular REST API request through Next.js API route
   */
  private async handleRestRequest(data: WorkflowRequest): Promise<WorkflowResponse> {
    try {
      const response: AxiosResponse<WorkflowResponse> = await this.axiosInstance.post("/workflow/run", data);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  /**
   * Handle Server-Sent Events using EventSource (GET request)
   */
  private handleEventSourceSSE(data: WorkflowRequest, callbacks: SSECallbacks): Promise<EventSource> {
    const { onMessage, onError, onComplete, onOpen } = callbacks;

    return new Promise((resolve, reject) => {
      // Clean up existing connection
      if (this.eventSourceRef) {
        this.eventSourceRef.close();
      }

      // Create URL with query parameters for EventSource (GET only)
      const url = new URL("/api/workflow/stream", window.location.origin);
      url.searchParams.append("inputs", JSON.stringify(data.inputs));
      url.searchParams.append("user", data.user);

      const eventSource = new EventSource(url.toString());
      this.eventSourceRef = eventSource;

      // Connection opened
      eventSource.onopen = (): void => {
        if (onOpen) onOpen();
        resolve(eventSource);
      };

      // Default message handler
      eventSource.onmessage = (event: MessageEvent): void => {
        try {
          if (event.data.includes("node_finished")) {
            onComplete?.();
            // eventSource.close();
            return;
          }

          if (event.data.includes("Stream completed")) {
            onComplete?.();
            onComplete?.();
            return;
          }

          if (event.data.includes("text_chunk")) {
            const data: SSEMessage = JSON.parse(event.data);
            if (onMessage) {
              onMessage(data);
            }
          }
        } catch (error) {
          console.error("❌ Error parsing SSE message:", error);
          if (onError) {
            onError(error as Error);
          }
        }
      };

      // Connection error
      eventSource.onerror = (event: Event): void => {
        console.error("❌ EventSource error:", event);
        const error = new Error("EventSource connection error");
        if (onError) {
          onError(error);
          eventSource.close();
        }
      };

      // Custom event listeners for Dify workflow events
      const workflowEvents = ["workflow_started", "node_started", "node_finished", "workflow_finished", "error"];

      workflowEvents.forEach((eventType) => {
        eventSource.addEventListener(eventType, (event: MessageEvent): void => {
          if (!event.data) return;

          try {
            const eventData = JSON.parse(event.data);
            const message: SSEMessage = {
              event: eventType,
              data: eventData,
              timestamp: Date.now(),
            };

            console.log(`🔔 ${eventType}:`, eventData);

            if (onMessage) {
              onMessage(message);
            }

            // Handle completion events
            if (eventType === "workflow_finished") {
              console.log("✅ Workflow completed successfully");
              if (onComplete) {
                onComplete(message);
              }
              eventSource.close();
            } else if (eventType === "error") {
              console.log("❌ Workflow error occurred");
              if (onError) {
                onError(new Error(eventData.message || "Workflow error"));
              }
              eventSource.close();
            }
          } catch (error) {
            console.error(`❌ Error parsing ${eventType} event:`, error);
            if (onError) {
              onError(error as Error);
            }
          }
        });
      });

      // Handle connection timeout
      const timeout = setTimeout(() => {
        if (eventSource.readyState === EventSource.CONNECTING) {
          eventSource.close();
          reject(new Error("EventSource connection timeout"));
        }
      }, 30000); // 30 seconds timeout

      // Clear timeout when connection is established
      eventSource.onopen = () => {
        clearTimeout(timeout);
        if (onOpen) onOpen();
        resolve(eventSource);
      };
    });
  }

  /**
   * Alternative SSE implementation using fetch + ReadableStream
   * Useful when EventSource limitations are encountered
   */
  async handleFetchSSE(data: WorkflowRequest, callbacks: SSECallbacks): Promise<SSEConnection> {
    const { onMessage, onError, onComplete, onOpen } = callbacks;

    try {
      const response = await fetch("/api/workflow/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (onOpen) onOpen();

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is not readable");
      }

      const decoder = new TextDecoder();
      let cancelled = false;

      const readStream = async (): Promise<void> => {
        try {
          while (!cancelled) {
            const { done, value } = await reader.read();

            if (done) {
              console.log("📡 Stream completed");
              if (onComplete) onComplete();
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const data: SSEMessage = JSON.parse(line.slice(6));
                  if (onMessage) onMessage(data);
                } catch (parseError) {
                  console.error("Error parsing SSE data:", parseError);
                }
              } else if (line.startsWith("event: ")) {
                // Handle event type if needed
                console.log("Event type:", line.slice(7));
              }
            }
          }
        } catch (streamError) {
          if (!cancelled && onError) {
            onError(streamError as Error);
          }
        }
      };

      readStream();

      return {
        close: (): void => {
          cancelled = true;
          reader.cancel();
        },
        readyState: cancelled ? 3 : 1, // CLOSED : OPEN
      };
    } catch (error) {
      if (onError) onError(error as Error);
      throw error;
    }
  }

  /**
   * Close active EventSource connection
   */
  closeConnection(): void {
    if (this.eventSourceRef) {
      this.eventSourceRef.close();
      this.eventSourceRef = null;
    }
  }

  /**
   * Get current connection status
   */
  getConnectionStatus(): number {
    return this.eventSourceRef?.readyState ?? EventSource.CLOSED;
  }

  /**
   * Check if currently connected
   */
  isConnected(): boolean {
    return this.eventSourceRef?.readyState === EventSource.OPEN;
  }

  /**
   * Handle and format API errors
   */
  private handleError(error: AxiosError): CustomError {
    if (error.response) {
      // Server responded with error status
      const errorMessage =
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (error.response.data as any)?.error ||
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (error.response.data as any)?.message ||
        error.response.statusText;
      const customError: CustomError = new Error(`API Error: ${errorMessage}`);
      customError.status = error.response.status;
      customError.data = error.response.data;
      return customError;
    }
    if (error.request)
      // Request was made but no response received
      return new Error("Network Error: No response from server");

    // Something else happened
    return new Error(`Request Error: ${error.message}`);
  }
}

const difyNextClient = new DifyAPIClient();

export default difyNextClient;
