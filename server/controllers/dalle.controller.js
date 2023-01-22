import { openai } from "../config/openAi.js";

export const createPhoto = async (prompt) => {
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = response.data.data[0].b64_json;

    return image;
  } catch (error) {
    console.log(error);
  }
};
