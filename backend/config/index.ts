export const CONFIG = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5000",
    credentials: true,
  },
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/pokemons",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  redis: {
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  },
  rateLimit: {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  },
};
