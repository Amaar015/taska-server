import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema); // Fixed the model creation

export default user;
