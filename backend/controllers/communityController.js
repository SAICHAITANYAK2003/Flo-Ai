import communityModel from "../models/Community.js";

//Get all images from the community
export const publishedCreations = async (req, res) => {
  try {
    const creations = await communityModel
      .find({}, "imageUrl -_id")
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
