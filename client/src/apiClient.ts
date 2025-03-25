import axios from "axios";

export const CONFIG = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  apiPrefix: import.meta.env.VITE_API_PREFIX || "/api",
} as const;

const apiClient = axios.create({
  baseURL: `${CONFIG.apiUrl}${CONFIG.apiPrefix}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
