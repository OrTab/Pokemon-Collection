import { Request, Response, NextFunction } from "express";
import { getCache, setCache } from "../cache/redisUtils";
import { logger } from "../utils/logger";

type CacheMiddlewareOptions = {
  expiration?: number;
  key?: string;
};

export const cacheMiddleware =
  ({ expiration, key }: CacheMiddlewareOptions = {}) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = key ? key : req.originalUrl;
    logger.info("cacheKey", cacheKey);
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      logger.info("Serving from cache:", cacheKey);
      res.json(cachedData);
      return;
    }

    const originalJson = res.json;
    res.json = function (data: any) {
      // Only cache successful responses (status codes 200-299)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        logger.info("Setting cache:", cacheKey);
        setCache({ key: cacheKey, data, expireSeconds: expiration });
      } else {
        logger.info("Not caching error response for:", cacheKey);
      }

      return originalJson.call(this, data);
    };

    next();
  };
