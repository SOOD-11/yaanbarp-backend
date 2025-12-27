// middlewares/auth.js
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import ApiError from "../utilities/ApiError.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // 1. Get token (from cookie or header)
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(401, "No token, not authorized");

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 3. Find user in DB
    const user = await User.findById(decoded._id).select("-password");
    if (!user) throw new ApiError(401, "User not found");

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    next(new ApiError(401, "Not authorized"));
  }
};

// Admin middleware
export const isAdmin = (req, res, next) => {
 // if (req.user?.role !== "admin") {
   // return next(new ApiError(403, "Admin access only"));
 // }
  next();
};