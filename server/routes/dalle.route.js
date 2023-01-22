import express from "express";
import { createPhoto } from "../controllers/dalle.controller.js";

const DalleRoutes = express.Router();

DalleRoutes.get("/", async (req, res) => {
  const { prompt } = req.query;
  try {
    const image64 = await createPhoto(prompt);
    res.status(200).json(image64);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default DalleRoutes;
