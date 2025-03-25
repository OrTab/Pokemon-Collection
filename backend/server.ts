import express from "express";
import cors from "cors";
import router from "./routes";
import { connectToDatabase } from "./mongodb";
import { initializeRedis } from "./cache/redis";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

app.use("/api", router);

const startServer = async () => {
  try {
    await connectToDatabase();
    await initializeRedis();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database or redis:", error);
    process.exit(1);
  }
};

startServer();
