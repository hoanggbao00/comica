"use client";
import difyNextClient from "@/lib/dify/dify-client";
import type { SSEMessage, WorkflowInputs, WorkflowResponse } from "@/lib/dify/types";
import { useCallback, useEffect, useRef, useState } from "react";

export const useDifyWorkflow = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<WorkflowResponse | null>(null);
  const [streamMessages, setStreamMessages] = useState<SSEMessage[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const eventSourceRef = useRef<EventSource | null>(null);

  const runWorkflow = useCallback(
    async (
      url: string,
      inputs: WorkflowInputs,
      mode: "blocking" | "streaming" = "blocking",
      user = "abc-123",
      isStopWhenGetId = false,
    ): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        if (mode === "blocking") {
          setResult(null);
          const response = (await difyNextClient.runWorkflow(url, {
            inputs,
            response_mode: "blocking",
            user,
          })) as WorkflowResponse;
          setResult(response);
        } else {
          setStreamMessages([]);
          setIsStreaming(true);

          const eventSource = (await difyNextClient.runWorkflow(
            url,
            {
              inputs,
              response_mode: "streaming",
              user,
              onOpen: () => {
                setIsStreaming(true);
                console.log("Stream started");
              },
              onMessage: (data: SSEMessage) => {
                setStreamMessages((prev) => [...prev, data]);
              },
              onError: (err: Error) => {
                setError(err);
                setIsStreaming(false);
              },
              onComplete: () => {
                setIsStreaming(false);
              },
            },
            isStopWhenGetId,
          )) as EventSource;

          eventSourceRef.current = eventSource;
        }
      } catch (err) {
        setError(err as Error);
        setIsStreaming(false);
        difyNextClient.closeConnection();
      } finally {
        if (mode === "blocking") {
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    },
    [],
  );

  const closeConnection = useCallback((): void => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsStreaming(false);
    }
    difyNextClient.closeConnection();
  }, []);

  const clearResults = useCallback((): void => {
    setResult(null);
    setStreamMessages([]);
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      closeConnection();
    };
  }, [closeConnection]);

  return {
    loading,
    result,
    streamMessages,
    error,
    isStreaming,
    isConnected: difyNextClient?.isConnected() ?? false,
    connectionStatus: difyNextClient?.getConnectionStatus() ?? "disconnected",
    runWorkflow,
    closeConnection,
    clearResults,
  };
};
