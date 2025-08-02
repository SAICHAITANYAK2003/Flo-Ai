import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./configs/mongodb.js";
import { clerkMiddleware } from "@clerk/express";
import AiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
dotenv.config();

const app = express();

const allowedOrigins = [
  "https://ai-nest-frontend.vercel.app",
  "http://localhost:5173",
];

//Middlewares

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(clerkMiddleware());

app.use("/ai", AiRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);

//Configs
await connectDb();

app.get("/", (req, res) => {
  res.send("Welcome to AI - SAAS Backend server");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("🚀 Server is running");
});
