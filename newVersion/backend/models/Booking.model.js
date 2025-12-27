import mongoose from "mongoose";

const BookingSchema=new mongoose.Schema({
user:{
type:mongoose.Schema.ObjectId,
ref:"User",



},

package:{
type: mongoose.Schema.Types.ObjectId,
ref:'Package',
required:true



},

priceAtBooking:{
type:Number,
required:true


},

status:{
type:String,
enum:["pending","confirmed","cancelled","completed"],
default:"pending"

},
payment:{
id:{type: String},
status:{
    type:String,
    enum:["pending","successful","failed"],
    default:"pending"
},

razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
method:{

    type:String
}


},
travellers:[
{
name:String,
age:Number,
gender:String


},


],

specialRequests:{

    type :String
},
travelDate: {
    type: Date,
    required: true, // make it required if every booking must have a date
  },






},{

timestamps:true


});


export const Booking =mongoose.model("Booking",BookingSchema);