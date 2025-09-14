import axios from "axios";

const comicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COMIC_API_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

export default comicApi;
