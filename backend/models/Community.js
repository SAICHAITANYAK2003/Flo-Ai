import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    imageUrl: { type: String },
    uploaderId: { type: String, required: true },
  },
  { timestamps: true }
);

const communityModel =
  mongoose.models.community || mongoose.model("community", communitySchema);

export default communityModel;
