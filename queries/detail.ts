import { useQuery } from "@tanstack/react-query";

export const useGetDetailWorkflow = (id?: string, isEnabled?: boolean) => {
  return useQuery({
    queryKey: ["detail-workflow", id],
    queryFn: async () => {
      const response = await fetch(`/api/workflow/run/detail?workflow_id=${id}`);
      const data = await response.json();
      return data as GetDetailResponse;
    },
    enabled: !!id && isEnabled && id !== "new-comic",
    refetchInterval: 5 * 1000, // 5s
  });
};
export interface GetDetailResponse {
  id: string;
  workflow_id: string;
  status: "running" | "succeeded" | "failed" | "stopped";
  inputs: string;
  outputs: string;
  error: null;
  total_steps: number;
  total_tokens: number;
  created_at: number;
  finished_at: number;
  elapsed_time: number;
}
