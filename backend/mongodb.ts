import mongoose from "mongoose";
import dotenv from "dotenv";
import { CONFIG } from "./config";
import { logger } from "./utils/logger";

dotenv.config();

const RETRIES = 3;

export const connectToDatabase = async (retries = RETRIES): Promise<void> => {
  try {
    await mongoose.connect(CONFIG.mongodb.uri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDB connection error:", { error, retries });
    if (retries > 0) {
      connectToDatabase(retries - 1);
    } else {
      logger.error(`Failed to connect to MongoDB after ${RETRIES} retries`);
      throw error;
    }
  }
};

mongoose.connection.on("error", (err) => {
  logger.error("MongoDB connection error:", { err });
});

mongoose.connection.on("disconnected", () => {
  logger.info("MongoDB disconnected");
});
