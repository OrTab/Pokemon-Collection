import express from "express";
import cors from "cors";
import router from "./routes";
import { connectToDatabase } from "./mongodb";
import { initializeRedis } from "./cache/redis";
import { CONFIG } from "./config";

const app = express();

// CORS configuration
app.use(cors(CONFIG.cors));
app.use(express.json());

// Routes
app.use("/api", router);

const startServer = async () => {
  try {
    await connectToDatabase();
    await initializeRedis();

    app.listen(CONFIG.port, () => {
      console.log(`Server running at http://${CONFIG.host}:${CONFIG.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
