import { Redis } from "ioredis";
import { CONFIG } from "../config";
import { logger } from "../utils/logger";
let redisClient: Redis;

const initializeRedis = () => {
  try {
    redisClient = new Redis(CONFIG.redis.REDIS_URL);

    redisClient.on("connect", () => {
      logger.info("Connected to Redis successfully");
    });

    redisClient.on("error", (err) => {
      logger.error("Redis Client Error:", { err });
    });
  } catch (error) {
    logger.error("Redis Connection Error:", { error });
  }
};

export { redisClient, initializeRedis };
