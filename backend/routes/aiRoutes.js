import express from "express";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
} from "../controllers/aiController.js";
import { userAuth } from "../middlewares/auth.js";

const AiRouter = express.Router();

AiRouter.post("/generate-article", userAuth, generateArticle);
AiRouter.post("/generate-blog-titles", userAuth, generateBlogTitle);
AiRouter.post("/generate-image", userAuth, generateImage);

export default AiRouter;
