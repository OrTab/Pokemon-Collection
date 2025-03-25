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
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
};
