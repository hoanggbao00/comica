import { useQuery } from "@tanstack/react-query";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const useGetImage = (workflow_id: string, output: any) => {
  return useQuery({
    queryKey: ["image", workflow_id],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GEMINI_API_URL}/comics/gemini`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: output,
      });
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }
      const data = await response.json();
      return data as GetImageResponse;
    },
    enabled: !!output && !!workflow_id,
  });
};
export interface GetImageResponse {
  success: boolean;
  message: string;
  data: Data;
  correlationId: string;
}

export interface Data {
  images: string[];
  imageCount: number;
  generationInfo: GenerationInfo;
  base64Images: string[];
}

export interface GenerationInfo {
  panelsGenerated: number;
  imagesUploaded: ImagesUploaded[];
  uploadErrors: number;
  successRate: number;
}

export interface ImagesUploaded {
  key: string;
  url: string;
  etag: string;
  size: number;
  mimeType: string;
}
