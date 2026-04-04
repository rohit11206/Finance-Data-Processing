import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "analyst", "admin"],
    default: "user"
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }, resetPasswordToken: {
      type: String,
      default: null
    },

    resetPasswordExpires: {
      type: Date,
      default: null
    }
  }
,{    timestamps:true }
);
export const User = mongoose.model("User", userSchema);