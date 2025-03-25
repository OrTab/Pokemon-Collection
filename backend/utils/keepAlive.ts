import axios from "axios";
import { CONFIG } from "../config";

const pingServer = async () => {
  try {
    await axios.get(`${CONFIG.apiUrl}/health`);
    console.log("Server pinged successfully");
  } catch (error) {
    console.error("Failed to ping server:", error);
  }
};

export const runKeepAlive = () => {
  // Ping every 10 minutes
  if (process.env.NODE_ENV === "production") {
    setInterval(pingServer, 10 * 60 * 1000);
  }
};
