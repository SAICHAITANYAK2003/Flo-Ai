import mongoose from "mongoose";

const paymentsSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    plan: { type: String, required: true, default: "free" },
    isPaid: { type: Boolean, required: true, default: false },
    creditBalance: { type: Number, default: 10 },
  },
  { timestamps: true }
);

const paymentsModel =
  mongoose.models.payment || mongoose.model("payment", paymentsSchema);

export default paymentsModel;
