import mongoose from "mongoose";
import { redisClient } from "../cache/redis";
import { intervalsIds } from "./intervals";

let isShuttingDown = false;

const closeResourcesConnections = async () => {
  await mongoose.connection.close();
  await redisClient.quit();
  console.log("Resources connections closed");
};

const cleanIntervals = () => {
  intervalsIds.forEach(clearInterval);
};

const gracefulShutdown = async (exitCode = 0) => {
  if (isShuttingDown) {
    try {
      await closeResourcesConnections();
      cleanIntervals();
      console.log("Graceful shutdown completed");
      process.exit(exitCode);
    } catch (error) {
      console.error("Error during graceful shutdown:", error);
      process.exit(1);
    }
  }
};

export const setupProcessHandlers = () => {
  process.on("SIGTERM", async () => {
    isShuttingDown = true;
    console.log("Received SIGTERM. Starting graceful shutdown...");
    await gracefulShutdown();
  });

  process.on("SIGINT", async () => {
    isShuttingDown = true;
    console.log("Received SIGINT. Starting graceful shutdown...");
    await gracefulShutdown();
  });

  process.on("SIGHUP", async () => {
    isShuttingDown = true;
    console.log("Received SIGHUP. Reloading server...");
    await gracefulShutdown();
  });

  process.on("uncaughtException", async (error) => {
    console.error("Uncaught Exception:", error);
    await gracefulShutdown(1);
  });

  process.on("unhandledRejection", async (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    await gracefulShutdown(1);
  });
};
