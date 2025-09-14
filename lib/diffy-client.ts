import axios, { type AxiosError, type AxiosInstance } from "axios";
import type {} from "./dify/types";

// Create Axios instance for Next.js API routes
const apiNextJsClient: AxiosInstance = axios.create({
  baseURL: "/api", // Points to Next.js API routes
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 60 seconds timeout for workflow requests
});

// Add request interceptor for logging
apiNextJsClient.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Add response interceptor for error handling
apiNextJsClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  },
);

export default apiNextJsClient;

// Enhanced Dify API client using Next.js routes
// Create and export the API client instance
