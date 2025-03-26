import mongoose from "mongoose";
import dotenv from "dotenv";
import { CONFIG } from "./config";
import { logger } from "./utils/logger";

dotenv.config();

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(CONFIG.mongodb.uri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDB connection error:", { error });
    process.exit(1);
  }
};

mongoose.connection.on("error", (err) => {
  logger.error("MongoDB connection error:", { err });
});

mongoose.connection.on("disconnected", () => {
  logger.info("MongoDB disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  logger.info("MongoDB connection closed");
  process.exit(0);
});
