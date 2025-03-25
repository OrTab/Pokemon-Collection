import { Request, Response, NextFunction } from "express";
import { getCache, setCache } from "../utils/redisUtils";

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
      console.log("Setting cache:", cacheKey);
      setCache(cacheKey, data, expiration);
      return originalJson.call(this, data);
    };

    next();
  };
