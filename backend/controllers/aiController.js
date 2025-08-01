import { getAuth } from "@clerk/express";
import { getGroqChatCompletion } from "../services/textService.js";
import creationsModel from "../models/Creations.js";
import axios from "axios";
import cloudinary from "../configs/cloudinary.js";

//Generate Article
export const generateArticle = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { prompt, length } = req.body;

    // Validate input
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User" });
    }

    if (!prompt || !length) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const maxTokens = parseInt(length);

    const response = await getGroqChatCompletion(prompt, maxTokens);
    const content = response?.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate article content.",
      });
    }

    await creationsModel.create({
      clerkId: userId,
      prompt,
      content,
      type: "article",
      category: length,
      publish: false,
      likes: [],
    });

    return res.json({ success: true, message: content });
  } catch (error) {
    console.error("generateArticle Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Generate Blog Titles
export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { prompt, category } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User" });
    }

    if (!prompt || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Prompt and category are required." });
    }

    const blogTitlePrompt = `Generate catchy blog title ideas for a blog about "${prompt}" in the category "${category}". Return only the titles as a numbered list.`;

    // Set maxTokens depending on your plan or requirements
    const maxTokens = plan === "premium" ? 100 : 60;

    const response = await getGroqChatCompletion(blogTitlePrompt, maxTokens);

    const content = response?.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to generate blog title." });
    }

    await creationsModel.create({
      clerkId: userId,
      prompt,
      content,
      type: "blog-title",
      category,
      publish: false,
      likes: [],
    });

    res.json({ success: true, message: content });
  } catch (error) {
    console.log("❌ Error in generateBlogTitle:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Generate Image
export const generateImage = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { prompt } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User" });
    }

    if (!prompt) {
      return res
        .status(400)
        .json({ success: false, message: "Prompt and style are required." });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const imageResponse = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    //Conver binary -> base64
    const base64 = Buffer.from(imageResponse.data).toString("base64");
    const dataUri = `data:image/png;base64,${base64}`;

    const cloudinaryResult = await cloudinary.uploader.upload(dataUri, {
      folder: "AiNest/generated-images",
    });

    res.json({
      success: true,
      message: cloudinaryResult.secure_url,
    });
  } catch (error) {
    console.log("❌ Error in generateImage:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
