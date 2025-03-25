import { Redis } from "ioredis";

let redisClient: Redis;

const initializeRedis = () => {
  try {
    if (process.env.NODE_ENV === "production") {
      redisClient = new Redis(process.env.REDIS_URL as string);
    } else {
      redisClient = new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
      });
    }

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
