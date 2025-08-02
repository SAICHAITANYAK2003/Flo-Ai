import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { getUserCreations } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/recent-creations", userAuth, getUserCreations);

export default userRouter;
