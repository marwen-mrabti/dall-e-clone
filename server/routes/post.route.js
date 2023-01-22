import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { createPost, getAllPosts } from "../controllers/post.controller.js";
import * as dotenv from "dotenv";

dotenv.config();
const PostRoutes = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
PostRoutes.get("/all", async (req, res) => {
  try {
    const { searchText } = req.query;
    const posts = await getAllPosts(searchText);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//create a post
PostRoutes.post("/new", async (req, res) => {
  try {
    const { form } = req.body;
    const { name, prompt, photo } = form;

    let photoUrl = await cloudinary.uploader.upload(photo);
    const post = await createPost(name, prompt, photoUrl);

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
export default PostRoutes;
