import creationsModel from "../models/Creations.js";
import paymentsModel from "../models/Payments.js";

export const getUserCreations = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User" });
    }

    const creations = await creationsModel
      .find({ clerkId: userId }, "prompt content type createdAt -_id")
      .sort({ createdAt: -1 });

    const fetchedCreations = creations.map((item) => ({
      prompt: item.prompt,
      content: item.content,
      type: item.type,
      createdAt: item.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: fetchedCreations,
    });
  } catch (error) {
    console.log("❌ Error in fetching Creations:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get User Credits

export const getUserCredits = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await paymentsModel.findOne(
      { clerkId: userId },
      "plan creditBalance -_id"
    );

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "No User in payments model" });
    }

    const userCreditsDetails = {
      userCredits: user.creditBalance,
      userPlan: user.plan,
    };

    res.json({ success: true, data: userCreditsDetails });
  } catch (error) {
    console.log("❌ Error in fetching User Credits:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
