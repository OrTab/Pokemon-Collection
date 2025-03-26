import { redisClient } from "../cache/redis";
import { logger } from "../utils/logger";
const DEFAULT_EXPIRATION = 3600; // 1 hour

export const setCache = async ({
  key,
  data,
  expireSeconds = DEFAULT_EXPIRATION,
}: {
  key: string;
  data: any;
  expireSeconds?: number;
}): Promise<void> => {
  try {
    await redisClient.setex(key, expireSeconds, JSON.stringify(data));
  } catch (error) {
    logger.error("Redis SET Error:", { error });
  }
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error("Redis GET Error:", { error });
    return null;
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
  } catch (error) {
    logger.error("Redis DELETE Error:", { error });
  }
};
