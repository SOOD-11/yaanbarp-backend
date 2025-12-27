// src/controllers/auth.controller.js
import asynchandler from "../utilities/asynchandler.js";
import { User } from "../models/User.model.js";
import { validationResult } from "express-validator";
import ApiError from "../utilities/ApiError.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

/**
 * Generate a single access token (30 minutes)
 * We keep payload minimal (id, email, role)
 */
const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id.toString(), email: user.email, role: user.role || "user" },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
};
 
/**
 * Cookie options:
 * - httpOnly true to protect from XSS
 * - secure true only in production
 * - sameSite Lax for normal flows; when using cross-site requests + cookie (e.g., if frontend hosted on different domain),
 *   you will need SameSite=None and secure=true (production)
 */
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: 30 * 60 * 1000, // 30 minutes
  path: "/"
};

// ---------------- Register (unchanged)
const registerUser = asynchandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, Fullname } = req.body;

  // Validate fields
  if (
    !email || String(email).trim() === "" ||
    !password || String(password).trim() === "" ||
    !Fullname ||
    !Fullname.firstname || String(Fullname.firstname).trim() === "" 
   
  ) {
    throw new ApiError(401, "Fill all the credentials");
  }

  // Check if user already exists
  const existed = await User.findOne({ email });
  if (existed) throw new ApiError(401, "User already exists");

  // Create new user
  const user = await User.create({
    email,
    password,
    Fullname: {
      firstname: String(Fullname.firstname).trim(),
      lastname: String(Fullname.lastname)?.trim(),
    },
  });

  return res.status(201).json({ user });
});
// ---------------- Login (email/password) (unchanged except token generation)
const loginUser = asynchandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  if ([email, password].some((f) => f?.trim() === "")) throw new ApiError(420, "Fill all the credentials");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(421, "User not registered");

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) throw new ApiError(422, "Email or password is incorrect");

  const accessToken = generateAccessToken(user);

  // set cookie and return token + user summary (omit sensitive fields in User model's toJSON)
  res
    .status(200)
    .cookie("token", accessToken, cookieOptions)
    .json({ message: "Logged in", token: accessToken, user: { _id: user._id, email: user.email } });
});

// ---------------- Google Sign-In (new)
const googleSignIn = asynchandler(async (req, res) => {
  /**
   * Expected body: { idToken: "<google-id-token>" }
   * idToken is the JWT credential returned by Google Identity Services on the frontend.
   */
  const {idToken} = req.body;
  if (!idToken) throw new ApiError(400, "idToken is required");

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  // Verify token audience + signature
  let ticket;
  try {
    ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
  } catch (err) {
    console.error("Google token verification failed:", err);
    throw new ApiError(401, "Invalid Google token");
  }

  const payload = ticket.getPayload();
  if (!payload) throw new ApiError(401, "Invalid Google payload");

  const email = payload.email;
  const googleId = payload.sub; // unique Google user id
  const name = payload.name;
  const picture = payload.picture;
  const emailVerified = payload.email_verified;

  // Security: ensure Google says email is verified
  if (!emailVerified) {
    throw new ApiError(403, "Google account email not verified");
  }

// split the names into firstname,lastname
    const nameParts = name.trim().split(" ");
  const firstname = nameParts.shift(); // first word
  const lastname = nameParts.join(" ") || ""; 
  // Find user with googleId OR same email
  let user = await User.findOne({ $or: [{ googleId }, { email }] });

  if (user) {
    // If user exists but doesn't have googleId, and email matches, link them
    if (!user.googleId) {
      if (user.email === email) {
        user.googleId = googleId;
    user.Fullname = user.Fullname || {};
      user.Fullname.firstname = user.Fullname.firstname || firstname;
      user.Fullname.lastname = user.Fullname.lastname || lastname;
      user.avatar = user.avatar || picture;
        user.avatar = user.avatar || picture;
        await user.save();
      } else {
        // Should be rare: we matched by email but googleId missing and emails differ → treat carefully
        // For now, we refuse to auto-link and ask the user to use normal login first (or contact support)
        throw new ApiError(409, "Account conflict. Please login with your email/password and link Google from profile.");
      }
    }
  } else {
    // New user: create minimal user record. password left null (or random) since auth via Google
    user = await User.create({
      email,
      Fullname:{
        firstname,
        lastname
      },
      googleId,
      avatar: picture,
     
    });
  }

  const accessToken = generateAccessToken(user);

  return res
    .status(200)
    .cookie("token", accessToken, cookieOptions)
    .json({ message: "Logged in with Google", token: accessToken, user: { _id: user._id, email: user.email, name: user.name } });
});

// ---------------- Logout
const logout = asynchandler(async (req, res) => {
  // no server-side token store: simply clear cookie
  return res.status(201).clearCookie("token", cookieOptions).json({ message: "Logged out" });
});

// ---------------- User details (protected route)
const userDetails = asynchandler(async (req, res) => {
  // req.user should be populated by auth middleware below
  const user = await User.findById(req.user?._id).select("-password -googleId");
  if (!user) throw new ApiError(404, "User not found");
  res.status(201).json({ user });
});

// ---------------- Auth middleware (use this to protect routes)
const authMiddleware = asynchandler(async (req, res, next) => {
  // Accept token either from cookie or Authorization header ("Bearer <token>")
  const token = req.cookies?.token || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : null);

  if (!token) throw new ApiError(401, "Authentication token missing");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // { _id, email, role }
    return next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }
});

export {
  registerUser,
  loginUser,
  logout,
  userDetails,
  googleSignIn,
  authMiddleware,
};

/// sowhat s the flow log