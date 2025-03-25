import mongoose from "mongoose";
import dotenv from "dotenv";
import { CONFIG } from "./config";

dotenv.config();

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(CONFIG.mongodb.uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});
