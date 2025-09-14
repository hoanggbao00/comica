import type { SSEMessage, WorkflowInputs } from "./types";

export const createWorkflowInput = (
  context: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  additionalInputs?: Record<string, any>,
): WorkflowInputs => {
  return {
    context,
    ...additionalInputs,
  };
};

export const formatSSEMessage = (message: SSEMessage): string => {
  const timestamp = message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : "N/A";
  return `[${timestamp}] ${message.event}: ${JSON.stringify(message.data, null, 2)}`;
};
