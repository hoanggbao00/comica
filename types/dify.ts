export interface WorkflowRequest {
  inputs: {
    context?: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    [key: string]: any;
  };
  response_mode: "blocking" | "streaming";
  user: string;
}

export interface DifyConfig {
  baseURL: string;
  apiKey: string;
}
