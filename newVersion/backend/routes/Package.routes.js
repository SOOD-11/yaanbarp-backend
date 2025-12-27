// routes/packageRoutes.js
import express from "express";
import { createPackage,getAllPackages,getPackageById,deletePackage } from "../controller/Package.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/Auth.middlware.js";

const Packagerouter = express.Router();

// Public route
Packagerouter.get("/", getAllPackages);
Packagerouter.get("/:id", getPackageById);

// Admin-only routes
Packagerouter.post("/createPackage", authMiddleware, isAdmin, createPackage);
Packagerouter.delete("/:id", authMiddleware, isAdmin, deletePackage);

export default Packagerouter;