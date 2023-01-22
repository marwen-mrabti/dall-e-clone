import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import { PostRoutes, DalleRoutes } from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.json("hello from dall-e");
});

app.use("/api/v1/posts", PostRoutes);
app.use("/api/v1/dalle", DalleRoutes);

const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server running on http://localhost:${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
