import user from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Ensure correct import

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email & Password are required!",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "User not found!",
      });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Send response
    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token,
      users: {
        userId: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message, // Send error message for debugging
    });
  }
};

export const registerController = async (req, res) => {
  try {
    let { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    const exisiting_user = await user.findOne({ email });

    if (exisiting_user) {
      return res.status(400).json({
        message: "User Already exist, Please login",
        success: false,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const newUser = await user.create({
        name,
        role,
        email,
        password,
      });
      return res.status(200).json({
        message: "User Registered successfuly",
        success: true,
        newUser,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      success: false,
      error,
    });
  }
};
