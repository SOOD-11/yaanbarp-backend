import express from 'express';
import { authMiddleware } from '../middlewares/Auth.middlware.js';
import { createOrder, verifyPayment } from '../controller/Payment.controller.js';



const PaymentRouter= express.Router();


PaymentRouter.post("/create-order",authMiddleware,createOrder);



PaymentRouter.post("/verify-payment",authMiddleware,verifyPayment);


export default PaymentRouter;