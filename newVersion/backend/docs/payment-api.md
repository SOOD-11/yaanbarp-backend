# Payment API Documentation

This document describes the REST API endpoints for payment processing using Razorpay.

---

## 1. Create Razorpay Order

**Endpoint:**  
`POST /api/payment/createorder`

**Headers:**  
- `Authorization: Bearer <JWT_TOKEN>`

**Request Body:**
```json
{
  "bookingId": "<booking_id>"
}
```

**Response (201):**
```json
{
  "orderId": "<razorpay_order_id>",
  "amount": <amount_in_paise>,
  "currency": "INR",
  "bookingId": "<booking_id>"
}
```

**Errors:**
- `404 Booking not found`
- `401 Unauthorized` (if token missing/invalid)

**Description:**  
Creates a new Razorpay order for the specified booking. The `orderId` returned should be used to initiate payment on the frontend.

---

## 2. Verify Payment

**Endpoint:**  
`POST /api/payment/verify-payment`

**Headers:**  
- `Authorization: Bearer <JWT_TOKEN>`

**Request Body:**
```json
{
  "bookingId": "<booking_id>",
  "razorpayPaymentId": "<razorpay_payment_id>",
  "razorpayOrderId": "<razorpay_order_id>",
  "razorpaySignature": "<razorpay_signature>"
}
```

**Response (201):**
```json
{
  "message": "Booking Confirmed",
  "booking": { /* updated booking object */ }
}
```

**Errors:**
- `404 no booking found with this id`
- `400 Invalid signature. Payment failed.`
- `401 Unauthorized` (if token missing/invalid)

**Description:**  
Verifies the payment signature from Razorpay. On success, updates the booking status to `confirmed`. On failure, marks payment as failed.

---

## Notes

- Always send the JWT token in the `Authorization` header.
- For `createorder`, use the returned `orderId` to initiate Razorpay payment on the frontend.
- After payment, collect `razorpayPaymentId`, `razorpayOrderId`, and `razorpaySignature` from Razorpay’s response and call `verify-payment`.
- On success, booking status will be updated to `confirmed`.

---