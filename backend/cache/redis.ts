import { Redis } from "ioredis";
import { CONFIG } from "../config";

let redisClient: Redis;

const initializeRedis = () => {
  try {
    redisClient = new Redis(CONFIG.redis.REDIS_URL);

    redisClient.on("connect", () => {
      console.log("Connected to Redis successfully");
    });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });
  } catch (error) {
    console.error("Redis Connection Error:", error);
  }
};

export { redisClient, initializeRedis };
