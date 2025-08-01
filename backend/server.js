import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./configs/mongodb.js";
import AiRouter from "./routes/aiRoutes.js";
dotenv.config();

const app = express();



//Middlewares
app.use(express.json());
app.use(cors());

app.use("/ai", AiRouter);

//Configs
await connectDb();

app.get("/", (req, res) => {
  res.send("Welcome to AI - SAAS Backend server");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("🚀 Server is running");
});
