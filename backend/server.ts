import express from "express";
import cors from "cors";
import router from "./routes";
import { connectToDatabase } from "./mongodb";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

app.use("/api", router);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });
