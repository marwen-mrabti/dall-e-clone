import Post from "../model/Post.model.js";

export const getAllPosts = async (searchText) => {
  try {
    let query = {};
    if (searchText) {
      query = {
        $or: [
          { name: { $regex: searchText, $options: "i x" } },
          { prompt: { $regex: searchText, $options: "i x" } },
        ],
      };
    }

    const posts = await Post.find(query).sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (name, prompt, photoUrl) => {
  try {
    const post = await Post.create({
      name: name,
      prompt: prompt,
      photoUrl: photoUrl.url,
    });
    return post;
  } catch (error) {
    console.log(error);
  }
};
