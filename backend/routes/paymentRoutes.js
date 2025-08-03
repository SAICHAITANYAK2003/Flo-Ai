import express from "express";
import {
  stripePayment,
  stripePaymentStatus,
} from "../controllers/paymentController.js";
import { userAuth } from "../middlewares/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/stripe", userAuth, stripePayment);
paymentRouter.post("/stripe-webhooks", stripePaymentStatus);

export default paymentRouter;
