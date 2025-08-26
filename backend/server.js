import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./configs/mongodb.js";
import { clerkMiddleware } from "@clerk/express";
import AiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import communityRouter from "./routes/communityRoutes.js";
dotenv.config();

const app = express();

const allowedOrigins = [
  "https://ai-nest-frontend.vercel.app",
  "http://localhost:5173",
  "https://floai.webinfloo.com",
];

//Stripe webhooks must come before express.json()
app.use("/payment/stripe-webhooks", express.raw({ type: "application/json" }));

//Middlewares

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());

app.use("/ai", AiRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/community", communityRouter);

//Configs
await connectDb();

app.get("/", (req, res) => {
  res.send("Welcome to AI - SAAS Backend server");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("🚀 Server is running");
});
