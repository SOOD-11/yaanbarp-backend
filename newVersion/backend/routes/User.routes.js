// src/routes/auth.routes.js
import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  userDetails,
  googleSignIn,

} from "../controller/User.Controller.js";
import { authMiddleware } from "../middlewares/Auth.middlware.js";
import { body } from "express-validator";

const UserRouter = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register user (email + password)
 * @access  Public
 */
UserRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("Fullname.firstname").notEmpty().withMessage("Firstname is required"),

  ],
  registerUser
);

/**
 * @route   POST /api/auth/login
 * @desc    Login with email + password
 * @access  Public
 */
UserRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);

/**
 * @route   POST /api/auth/google
 * @desc    Login/Register using Google Sign-In
 * @access  Public
 */
UserRouter.post("/google", googleSignIn);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout (clear token cookie)
 * @access  Public (no harm calling without auth)
 */
UserRouter.post("/logout", authMiddleware, logout);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user details
 * @access  Private
 */
UserRouter.get("/me", authMiddleware, userDetails);

export default UserRouter;