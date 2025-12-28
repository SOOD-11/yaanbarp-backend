import Razorpay from "razorpay";
import { Booking } from "../models/Booking.model.js";
import ApiError from "../utilities/ApiError.js";
import asynchandler from "../utilities/asynchandler.js";
import  crypto  from "crypto";
import nodemailer from "nodemailer";
// CREATING RAZORPAY SECRETS  CLASS


const razorpay=new Razorpay({
    key_id:"rzp_test_REHGiFLyULooQk",
    key_secret:"pqU7AFkAtmtoWh5nin4S7G67git"
});
 

// step 1 find in the dbs the instance of booking with requested booking id

    const createOrder=asynchandler(async(req,res,next)=>{
const {bookingId}=req.body;
    const booking=await Booking.findById(bookingId);
    if(!booking){
        throw new ApiError(404,"Booking not found");
    }
    // order options
    
    const options={
    amount : booking.priceAtBooking*100,
    currency: "INR",
    receipt: `receipt_${booking._id}`,
    
    
    }
    
    // order instance creation
      const order=await razorpay.orders.create(options);
    
    
    
    // save orderId in database
    booking.payment.razorpayOrderId=order.id;
    await booking.save();
    
    return res.status(201).json({
    orderId: order.id,
    amount: options.amount,
    currency:options.currency,
    bookingId: booking._id
    
    });


});
const transporter = nodemailer.createTransport({
  host:"smtp.zoho.in",   // or smtp.zoho.com
  port: 465,
  secure: true,           // true for 465, false for 587
  auth: {
    user: "sanchitsood@yaanbarpe.in", // your Zoho email
    pass:  "ve9zkTPgYuH1"   
  },
});



const verifyPayment = asynchandler(async (req, res, next) => {
  const { bookingId, razorpayPaymentId, razorpayOrderId, razorpaySignature, method } = req.body;

const  booking = await Booking.findById(bookingId).populate("user");
  if (!booking) throw new ApiError(404, "No booking found with this id");

  const sign = razorpayOrderId + "|" + razorpayPaymentId;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_TEST_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (expectedSign === razorpaySignature) {
    booking.payment = {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      status: "successful",
      method: method || "unknown",
    };

    booking.status = "confirmed";
    await booking.save();

    // travellers table
    const travellersList = booking.travellers
      .map(
        (t, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${t.name}</td>
          <td>${t.age}</td>
          <td>${t.gender}</td>
        </tr>`
      )
      .join("");

    const emailHTML = `
      <h2>Booking Confirmation</h2>
      <p>Dear ${booking.user.Fullname?.firstname} ${booking.user.Fullname?.lastname},</p>
      <p>Your booking has been confirmed with YaanBarpe. Here are the details:</p>
      </p>
      <ul>
        <li><b>Booking ID:</b> ${booking._id}</li>
        <li><b>Title:</b> ${booking.title}</li>
        <li><b>Travel Date:</b> ${booking.travelDate}</li>
        <li><b>Total Price:</b> ₹${booking.priceAtBooking}</li>
         
        <li><b>Payment ID:</b> ${razorpayPaymentId}</li>

      </ul>
      <h3>Travellers</h3>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:100%;">
    <thead style="background:#f4f4f4;">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Age</th>
        <th>Gender</th>
      </tr>
    </thead>
    <tbody>
      ${travellersList}
    </tbody>
  </table>
      <p>Thank you for choosing us!</p>
    `;
    

    // Send emails
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: booking.user.email,
      subject: "Booking Confirmation - " + booking.title,
      html: emailHTML,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.LOGISTICS_EMAIL,
      subject: "New Booking Assigned - " + booking.title,
      html: emailHTML,
    });

    return res.status(201).json({ message: "Booking Confirmed", booking });
  } else {
    booking.payment.status = "failed";
    await booking.save();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: [booking.user.email, process.env.LOGISTICS_EMAIL],
      subject: "Payment Failed - " + booking.title,
      html: `<p>Dear ${booking.user.Fullname.firstname},</p>
             <p>Unfortunately, your payment failed for booking <b>${booking.title}</b>.</p>`,
    });

    return res.status(400).json({ error: "Invalid signature. Payment failed." });
  }
});

export {
createOrder,
verifyPayment


}




