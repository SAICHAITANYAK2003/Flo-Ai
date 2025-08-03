import express from "express";
import { userAuth } from "../middlewares/auth.js";
import {
  getUserCreations,
  getUserCredits,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/recent-creations", userAuth, getUserCreations);
userRouter.get("/credits", userAuth, getUserCredits);

export default userRouter;
