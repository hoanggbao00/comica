// Type definitions
export interface WorkflowInputs {
  context: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}

export interface WorkflowRequest {
  inputs: WorkflowInputs;
  response_mode: "blocking" | "streaming";
  user: string;
}

export interface WorkflowResponse {
  workflow_run_id: string;
  task_id: string;
  data: {
    id: string;
    workflow_id: string;
    status: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    outputs: Record<string, any>;
    error?: string;
    elapsed_time: number;
    total_tokens: number;
    total_steps: number;
    created_at: number;
    finished_at: number;
  };
}

export interface SSEMessage {
  event: string;
  workflow_run_id?: string;
  task_id?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: Record<string, any>;
  timestamp?: number;
}

export interface SSECallbacks {
  onMessage?: (data: SSEMessage) => void;
  onError?: (error: Error) => void;
  onComplete?: (finalData?: SSEMessage) => void;
  onOpen?: () => void;
}

export interface RunWorkflowParams extends Omit<WorkflowRequest, "response_mode"> {
  response_mode?: "blocking" | "streaming";
}

export interface RunWorkflowStreamingParams extends RunWorkflowParams, SSECallbacks {
  response_mode: "streaming";
}

export interface RunWorkflowBlockingParams extends RunWorkflowParams {
  response_mode?: "blocking";
}

export interface CustomError extends Error {
  status?: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any;
}

export interface SSEConnection {
  close: () => void;
  readyState: number;
}
