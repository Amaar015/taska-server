import jwt from "jsonwebtoken";
import { promisify } from "util"; // Import promisify
import user from "../models/userModel.js"; // Ensure correct import

export const Protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in! Please log in.",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const this_user = await user.findById(decoded.userId);
    if (!this_user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or user does not exist.",
      });
    }

    req.user = this_user;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed!",
      error: error.message,
    });
  }
};
