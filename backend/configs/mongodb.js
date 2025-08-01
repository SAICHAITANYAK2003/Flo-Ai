import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ Mongo DB Connected");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/AiNest`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
