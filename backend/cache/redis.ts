import { Redis } from "ioredis";
import { CONFIG } from "../config";
import { logger } from "../utils/logger";
let redisClient: Redis;
const RETRIES = 3;

const initializeRedis = (retries = RETRIES) => {
  try {
    redisClient = new Redis(CONFIG.redis.REDIS_URL);

    redisClient.on("connect", () => {
      logger.info("Connected to Redis successfully");
    });

    redisClient.on("error", (err) => {
      logger.error("Redis Client Error:", { err });
    });
  } catch (error) {
    logger.error("Redis Connection Error:", { error, retries });
    if (retries > 0) {
      initializeRedis(retries - 1);
    } else {
      logger.error(`Failed to connect to Redis after ${RETRIES} retries`);
    }
  }
};

export { redisClient, initializeRedis };
