import paymentsModel from "../models/Payments.js";

export const checkCredits = async (req, res, next) => {
  try {
    let user = await paymentsModel.findOne({ clerkId: req.userId });

    if (!user) {
      user = await paymentsModel.create({
        clerkId: req.userId,
      });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "Limit exceeded. Subscribe to premium plan.",
      });
    }

    req.paymentUser = user;

    next();
  } catch (error) {
    console.error("❌ check Credits middleware error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
