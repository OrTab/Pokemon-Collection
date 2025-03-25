import { redisClient } from "../cache/redis";

const DEFAULT_EXPIRATION = 3600; // 1 hour

export const setCache = async (
  key: string,
  data: any,
  expireSeconds = DEFAULT_EXPIRATION
): Promise<void> => {
  try {
    await redisClient.setex(key, expireSeconds, JSON.stringify(data));
  } catch (error) {
    console.error("Redis SET Error:", error);
  }
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Redis GET Error:", error);
    return null;
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error("Redis DELETE Error:", error);
  }
};
