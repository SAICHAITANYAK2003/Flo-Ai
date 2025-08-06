import { getGroqChatCompletion } from "../services/textService.js";
import creationsModel from "../models/Creations.js";
import communityModel from "../models/Community.js";
import axios from "axios";
import cloudinary from "../configs/cloudinary.js";
import paymentsModel from "../models/Payments.js";
import dotenv from "dotenv";
import FormData from "form-data";
import pdf from "pdf-parse/lib/pdf-parse.js";
dotenv.config();

//Generate Article
export const generateArticle = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt, length } = req.body;
    const user = req.paymentUser;

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

    const newBalance = user.creditBalance - 1;
    await paymentsModel.findOneAndUpdate(
      { clerkId: userId },
      {
        creditBalance: newBalance,
      }
    );

    return res.json({ success: true, message: content });
  } catch (error) {
    console.error("generateArticle Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Generate Blog Titles
export const generateBlogTitle = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt, category } = req.body;
    const user = req.paymentUser;

    if (!prompt || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Prompt and category are required." });
    }

    const blogTitlePrompt = `Generate catchy blog title ideas for a blog about "${prompt}" in the category "${category}". Return only the titles as a numbered list.`;

    // Set maxTokens depending on your plan or requirements
    const maxTokens = user.plan === "premium" ? 100 : 60;

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

    const newBalance = user.creditBalance - 1;
    await paymentsModel.findOneAndUpdate(
      { clerkId: userId },
      {
        creditBalance: newBalance,
      }
    );

    res.json({ success: true, message: content });
  } catch (error) {
    console.log("❌ Error in generateBlogTitle:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Generate Image
export const generateImage = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt, publish } = req.body;
    const user = req.paymentUser;

    if (!prompt) {
      return res
        .status(400)
        .json({ success: false, message: "Prompt and style are required." });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const headers = {
      ...formData.getHeaders(), // ✅ Required to include correct Content-Type
      "x-api-key": process.env.CLIPDROP_API_KEY, // ✅ Must not be undefined
    };

    const imageResponse = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers,
        responseType: "arraybuffer",
      }
    );

    console.log(`image response`, imageResponse);

    //Conver binary -> base64
    const base64 = Buffer.from(imageResponse.data).toString("base64");

    //Checks which type of file we get from the clipdrop
    const fileType = imageResponse.headers["content-type"] || "image/png";

    const dataUri = `data:${fileType};base64,${base64}`;

    const cloudinaryResult = await cloudinary.uploader.upload(dataUri, {
      folder: "AiNest/generated-images",
    });

    const securedUrl = cloudinaryResult.secure_url;

    console.log(`secured url `, securedUrl);

    const newBalance = user.creditBalance - 1;
    await paymentsModel.findOneAndUpdate(
      { clerkId: userId },
      {
        creditBalance: newBalance,
      }
    );

    try {
      const newCreation = await creationsModel.create({
        clerkId: userId,
        prompt,
        content: securedUrl,
        type: "image-generation",
        publish: publish,
        likes: [],
      });
      console.log("✅ Saved creation:", newCreation);
    } catch (creationErr) {
      console.error("❌ Error saving to DB:", creationErr);
    }

    if (publish) {
      await communityModel.create({
        imageUrl: securedUrl,
        uploaderId: userId,
      });
    }

    res.json({
      success: true,
      message: securedUrl,
    });
  } catch (error) {
    console.log("❌ Error in generateImage:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Background Removal

export const removeBg = async (req, res) => {
  try {
    const userId = req.userId;
    const imageFile = req.file.buffer;
    const user = req.paymentUser;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Please Upload your image file" });
    }

    //Background removal Clipdrp api

    const formData = new FormData();
    formData.append("image_file", imageFile, {
      filename: req.file.originalname || "image.png",
      contentType: req.file.mimetype || "image/png",
    });

    const headers = {
      ...formData.getHeaders(),
      "x-api-key": process.env.CLIPDROP_API_KEY,
    };

    const imageResponse = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      formData,
      {
        headers,
        responseType: "arraybuffer",
      }
    );

    //Convet image raw file to base64

    const base64 = Buffer.from(imageResponse.data).toString("base64");

    //Checks which type of file we get from the clipdrop
    const fileType = imageResponse.headers["content-type"] || "image/png";

    const dataUri = `data:${fileType};base64,${base64}`;

    const cloudinaryResult = await cloudinary.uploader.upload(dataUri, {
      folder: "AiNest/Bgremoved-images",
    });

    const securedUrl = cloudinaryResult.secure_url;

    const newBalance = user.creditBalance - 1;

    //Updating the payment model
    await paymentsModel.findOneAndUpdate(
      { clerkId: userId },
      { creditBalance: newBalance }
    );
    const prompt = `Removed background from image: ${req.file.originalname}`;

    //Updating the creations model
    await creationsModel.create({
      clerkId: userId,
      prompt,
      content: securedUrl,
      type: "background-removal",
      publish: false,
      likes: [],
    });

    res.json({
      success: true,
      message: securedUrl,
    });
  } catch (error) {
    console.log("❌ Error in Bg Remove:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Object Removal

export const removeObject = async (req, res) => {
  try {
    const userId = req.userId;
    const { object } = req.body;
    const imageFile = req.file.buffer;
    const user = req.paymentUser;

    if (!imageFile || !object) {
      return res.status(400).json({
        success: false,
        message: "Please Upload your image file and object",
      });
    }

    //convert buffer to base64
    const base64 = imageFile.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "AiNest/object-removal",
      transformation: [
        {
          effect: `gen_remove:prompt_${encodeURIComponent(
            object
          )};remove-shadow_true`,
        },
      ],
    });
    console.log(uploadResult);

    const transformedUrl = uploadResult.url;

    const newBalance = user.creditBalance - 1;

    //Updating the payment model
    await paymentsModel.findOneAndUpdate(
      { clerkId: userId },
      { creditBalance: newBalance }
    );

    const prompt = `Remove object "${object}" from uploaded image.`;
    await creationsModel.create({
      clerkId: userId,
      prompt,
      content: transformedUrl,
      type: "object-removal",
      publish: false,
      likes: [],
    });

    res.json({ success: true, message: transformedUrl });
  } catch (error) {
    console.log("❌ Error in Oject removal:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Resume Review
export const resumeReview = async (req, res) => {
  try {
    const userId = req.userId;
    const user = req.paymentUser;
    const resumeFile = req.file?.buffer;

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Please Upload your file",
      });
    }

    if (resumeFile.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume file exceeds allowed size (5MB).",
      });
    }

    const pdfText = await pdf(resumeFile);
    const extractedText = pdfText.text;

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content: \n\n ${extractedText}`;

    const response = await getGroqChatCompletion(prompt);
    const content = response?.choices?.[0]?.message?.content?.trim();

    await creationsModel.create({
      clerkId: userId,
      prompt,
      content: content,
      type: "resume-review",
      publish: false,
      likes: [],
    });

    const newBalance = user.creditBalance - 1;

    //Updating the payment model
    await paymentsModel.findOneAndUpdate(
      { clerkId: userId },
      { creditBalance: newBalance }
    );

    res.json({ success: true, message: content });
  } catch (error) {
    console.log("❌ Error in generateImage:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
