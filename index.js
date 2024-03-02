import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotEnv from "dotenv";
import Project from "./model/project.model.js";

dotEnv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.get("/api/test", (req, res) => {
  res.send("Hello World");
});
app.get("/api/getThreeProjects", async (req, res) => {
  const projectDocs = await Project.find().sort({ createdAt: -1 }).limit(3);
  res.json(projectDocs);
});
app.get("/api/allProjects", async (req, res) => {
  const projectDocs = await Project.find().sort({ createdAt: -1 });
  res.json(projectDocs);
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(3000, () => {
      console.log("App is running in port 3000");
    });
  })
  .catch((error) => {
    console.log("Mongo error: ", error);
  });
