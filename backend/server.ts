import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import router from "./routes";
import { connectToDatabase } from "./mongodb";
import { initializeRedis } from "./cache/redis";
import { CONFIG } from "./config";
import { requestLogger } from "./middlewares/requestLogger";
import { logger } from "./utils/logger";
import { setupProcessHandlers } from "./utils/processHandlers";
import { setupIntervals } from "./utils/intervals";

const app = express();

const limiter = rateLimit(CONFIG.rateLimit);

// Logger middleware
app.use(requestLogger);

// CORS configuration
app.use(cors(CONFIG.cors));

// Rate limiting
app.use(limiter);

// JSON parser
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Routes
app.use("/api", router);

const startServer = async () => {
  try {
    await connectToDatabase();
    await initializeRedis();
    setupIntervals();
    setupProcessHandlers();

    app.listen(CONFIG.port, () => {
      logger.info(`Server running at http://${CONFIG.host}:${CONFIG.port}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", { error });
    process.exit(1);
  }
};

startServer();
