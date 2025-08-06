import express from "express";
import { publishedCreations } from "../controllers/communityController.js";

const communityRouter = express.Router();

communityRouter.get("/all-images", publishedCreations);

export default communityRouter;
