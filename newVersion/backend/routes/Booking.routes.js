import express from 'express';
import { authMiddleware } from '../middlewares/Auth.middlware.js';
import { createBooking, fetchBooking, getbooking } from '../controller/Booking.controller.js';
import { updateBookingStatus } from '../controller/Booking.controller.js';
import { body } from 'express-validator';

import { isAdmin } from '../middlewares/Auth.middlware.js';

const BookingRouter=express.Router();

BookingRouter.post("/create-booking",authMiddleware,createBooking);
//always place dynamic routes at last 
BookingRouter.get("/my-bookings",authMiddleware, fetchBooking);
BookingRouter.get("/:bookingId",getbooking);




// Update booking status (admin only)
BookingRouter.patch(
  "/:bookingId",
  [
    body("status")
      .isIn(["pending", "confirmed", "completed","cancelled"])
      .withMessage("Invalid booking status"),
  ],
    authMiddleware,
  isAdmin,

  updateBookingStatus
);


export default BookingRouter;