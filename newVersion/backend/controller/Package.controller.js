// controllers/packageController.js
import { Package } from "../models/Packages.model.js";
import ApiError from "../utilities/ApiError.js";
import asynchandler from "../utilities/asynchandler.js";

// Create new package (Admin only)
 const createPackage = asynchandler(async (req, res, next) => {
  const { title, description, duration, price,pyramidlevel } = req.body;

  if (!title || !description || !duration || !price ||  !pyramidlevel) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const pkg = await Package.create({
    title,
    description,
    duration,
    price,
  pyramidlevel
  });

  res.status(201).json({ message: "Package created", pkg });
});

// Get all packages (public)
 const getAllPackages = asynchandler(async (req, res, next) => {
  const packages = await Package.find();
  res.status(200).json({ packages });
});

// Get single package by ID
 const getPackageById = asynchandler(async (req, res, next) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) throw new ApiError(404, "Package not found");
  res.status(200).json({ pkg });
});

// Delete a package (Admin only)
 const deletePackage = asynchandler(async (req, res, next) => {
  const pkg = await Package.findByIdAndDelete(req.params.id);
  if (!pkg) throw new ApiError(404, "Package not found");
  res.status(200).json({ message: "Package deleted" });
});

export{
createPackage,
getAllPackages,
getPackageById,
deletePackage
}