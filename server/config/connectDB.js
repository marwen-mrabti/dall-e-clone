import mongoose from "mongoose";

export const connectDB = async (mongo_uri) => {
  mongoose.set("strictQuery", true);
  try {
    mongoose.connect(mongo_uri, () => console.log("db connected"));
  } catch (error) {
    console.log(error);
  }
};
