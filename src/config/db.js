import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/finance_db";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI,{
  serverSelectionTimeoutMS: 5000 // 5 seconds
});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  } 
};
