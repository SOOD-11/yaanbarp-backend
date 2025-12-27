import ApiError from "../utilities/ApiError.js";
import asynchandler from "../utilities/asynchandler.js";
import { Booking } from "../models/Booking.model.js";
import { Package } from "../models/Packages.model.js";
import { validationResult } from "express-validator";
import { User } from "../models/User.model.js";

const createBooking = asynchandler(async (req, res, next) => {
  const { packageId, travellers, totalPrice, specialRequest, travelDate } = req.body;
console.log("requestedbody");
  //ensure package exists
  const PackageExists = await Package.findById(packageId);
  if (!PackageExists) {
    throw new ApiError(421, "No such package exists");
  }
  const booking = await Booking.create({
    user:req.user._id,
    package: packageId,
    travellers,
    priceAtBooking: totalPrice,
    specialRequest,
    travelDate,
    status: "pending",
  });

  res.status(201).json({ message: "Booking created", booking });
});



// now user can see what  are his bookings
const fetchBooking = asynchandler(async (req, res, next) => {
  // sort  -1 sorting according latest one  appeared first
const UserId=req.user._id;
  const bookings = await Booking.find({ user: UserId ,status:'confirmed'})
    .populate("package", "title duration price")
    .sort({ createdAt: -1 });
  res.status(201).json({ bookings });
});
// get booking  by id
const getbooking = asynchandler(async (req, res, next) => {
const   bookingId  = req.params.bookingId;
  console.log("Params:", req.params);

  if (!bookingId) {
    throw new ApiError(404, "incorrect bookingId");
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "booking not found ");
  }

  res.status(200).json({ booking });
});

// updating booking status

const updateBookingStatus = asynchandler(async (req, res, next) => {
  const { bookingId } = req.params;
  const { status } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(431).josn({ errors: errors.array });
  }

  const validStatus = ["pending", "confirmed", "completed", "cancelled"];
  if (validStatus.includes(status)) {
    throw new ApiError(421, "Invalid  booking status ");
  }

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true }
  );
  res.status(201).json({ message: "status updated", booking });
});

const getAllBookings = asynchandler(async (req, res, next) => {
  const bookings = await Booking.find()
    .populate("user", "email fullname.firstname")
    .populate("package", "title duration price");
});

export {
  createBooking,
  fetchBooking,
  updateBookingStatus,
  getAllBookings,
  getbooking,
};
