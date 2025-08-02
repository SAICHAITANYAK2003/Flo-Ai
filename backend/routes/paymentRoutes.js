import express from "express";
import {
  stripePayment,
  stripePaymentStatus,
} from "../controllers/paymentController.js";
import { userAuth } from "../middlewares/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/stripe", userAuth, stripePayment);
paymentRouter.post(
  "/stipe-webhooks",
  express.raw({ type: "application/json" }),
  stripePaymentStatus
);

export default paymentRouter;
