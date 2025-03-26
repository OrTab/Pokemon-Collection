import axios from "axios";
import { CONFIG } from "../config";
import { logger } from "./logger";

const pingServer = async () => {
  try {
    await axios.get(`${CONFIG.apiUrl}/health`);
    logger.info("Server pinged successfully");
  } catch (error) {
    logger.error("Failed to ping server:", { error });
  }
};

export const runKeepAlive = () => {
  // Ping every 10 minutes
  if (process.env.NODE_ENV === "production") {
    setInterval(pingServer, 10 * 60 * 1000);
  }
};
