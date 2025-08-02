import creationsModel from "../models/Creations.js";

export const getUserCreations = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User" });
    }

    const creations = await creationsModel
      .find({ clerkId: userId }, "prompt content type")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: creations,
    });
  } catch (error) {
    console.log("❌ Error in fetching Creations:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const publishedCreations = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User" });
    }

    const creations = await creationsModel
      .find({ clerkId: userId, publish: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: creations,
    });
  } catch (error) {
    console.log("❌ Error in fetching Published Creations:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
