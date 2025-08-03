import { getAuth } from "@clerk/express";

export const userAuth = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    console.log(`userId`, userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    req.userId = userId;

    next();
  } catch (error) {
    console.error("❌ userAuth middleware error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
