import express from "express";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeBg,
  removeObject,
  resumeReview,
} from "../controllers/aiController.js";
import { userAuth } from "../middlewares/auth.js";
import { upload } from "../configs/multer.js";
import { checkCredits } from "../middlewares/checkCredits.js";
import { getUserCreations } from "../controllers/userController.js";

const AiRouter = express.Router();

AiRouter.post("/generate-article", userAuth, checkCredits, generateArticle);
AiRouter.post(
  "/generate-blog-titles",
  userAuth,
  checkCredits,
  generateBlogTitle
);
AiRouter.post("/generate-image", userAuth, checkCredits, generateImage);
AiRouter.post(
  "/remove-background",
  userAuth,
  checkCredits,
  upload.single("image"),
  removeBg
);

AiRouter.post(
  "/object-removal",
  userAuth,
  checkCredits,
  upload.single("image"),
  removeObject
);

AiRouter.post(
  "/resume-review",
  userAuth,
  checkCredits,
  upload.single("resume"),
  resumeReview
);

export default AiRouter;
