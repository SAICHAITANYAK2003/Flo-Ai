import mongoose from "mongoose";

const creationsSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true },
    prompt: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "article",
        "blog-title",
        "image-generation",
        "background-removal",
        "object-removal",
        "resume-review",
      ],
      required: true,
    },
    category: { type: mongoose.Schema.Types.Mixed },
    publish: { type: Boolean, default: false },
    likes: { type: [String], default: [] },
  },
  { timestamps: true }
);

const creationsModel =
  mongoose.models.creation || mongoose.model("creation", creationsSchema);

export default creationsModel;
