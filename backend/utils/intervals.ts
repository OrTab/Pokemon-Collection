import axios from "axios";
import { CONFIG } from "../config";
import { logger } from "./logger";

export let intervalsIds: (NodeJS.Timeout | undefined)[] = [];

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
    return setInterval(pingServer, 10 * 60 * 1000);
  }
};

const INTERVALS_TASKS = [runKeepAlive] as const;

export const setupIntervals = () => {
  intervalsIds = INTERVALS_TASKS.map((task) => task());
};
