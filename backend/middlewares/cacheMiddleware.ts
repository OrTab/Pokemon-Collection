import { Request, Response, NextFunction } from "express";
import { getCache, setCache } from "../cache/redisUtils";

type CacheMiddlewareOptions = {
  expiration?: number;
  key?: string;
};

export const cacheMiddleware =
  ({ expiration, key }: CacheMiddlewareOptions = {}) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = key ? key : req.originalUrl;
    console.log("cacheKey", cacheKey);
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      console.log("Serving from cache:", cacheKey);
      res.json(cachedData);
      return;
    }

    const originalJson = res.json;
    res.json = function (data: any) {
      // Only cache successful responses (status codes 200-299)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log("Setting cache:", cacheKey);
        setCache({ key: cacheKey, data, expireSeconds: expiration });
      } else {
        console.log("Not caching error response for:", cacheKey);
      }

      return originalJson.call(this, data);
    };

    next();
  };
