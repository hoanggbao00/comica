import axios, { type AxiosError, type AxiosInstance } from "axios";
import type {} from "./types";

// Create Axios instance for Next.js API routes
const difyAxiosClient: AxiosInstance = axios.create({
  baseURL: "", // Points to Next.js API routes
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 60 seconds timeout for workflow requests
});

// Add request interceptor for logging
difyAxiosClient.interceptors.request.use(
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
difyAxiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  },
);

export default difyAxiosClient;
