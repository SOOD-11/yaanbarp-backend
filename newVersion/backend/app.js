import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import ConnectToDatabase from "./db/ConnectToDatabase.js";


import cookieParser from "cookie-parser";
import UserRouter from "./routes/User.routes.js";
import BookingRouter from "./routes/Booking.routes.js";
import Packagerouter from "./routes/Package.routes.js";
import PaymentRouter from "./routes/Payment.route.js";



const app=express();


app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:8080','https://www.yaanbarpe.in','https://yaanbarpe-git-main-sood-11s-projects.vercel.app',
    'https://yaanbarpe-2iruscdji-sood-11s-projects.vercel.app/'
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));


ConnectToDatabase();

app.get('/', (req,res)=>{
  res.send("hello world i am on the top");  
})
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1/user',UserRouter);
app.use('/api/v1/booking',BookingRouter);
app.use('/api/v1/package',Packagerouter);
app.use('/api/v1/payment',PaymentRouter);



export default app;

