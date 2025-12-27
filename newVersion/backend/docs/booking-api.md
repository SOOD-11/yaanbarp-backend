# Booking API Documentation

This document describes the REST API endpoints for booking travel packages.

---

## 1. Create Booking

**Endpoint:**  
`POST /api/booking/create-booking`

**Headers:**  
- `Authorization: Bearer <JWT_TOKEN>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "packageId": "<package_id>",
  "travelers": [
    { "name": "Alice", "age": 28, "gender": "female" },
    { "name": "Bob", "age": 30, "gender": "male" }
  ],
  "totalPrice": 15000
}
```

**Response (201):**
```json
{
  "message": "Booking created",
  "booking": {
    "_id": "<booking_id>",
    "user": "<user_id>",
    "package": "<package_id>",
    "travelers": [
      { "name": "Alice", "age": 28, "gender": "female" },
      { "name": "Bob", "age": 30, "gender": "male" }
    ],
    "priceAtBooking": 15000,
    "status": "pending",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Errors:**
- `400` Missing packageId or travelers
- `421` No such package exists
- `401` Unauthorized

---

## 2. Get My Bookings

**Endpoint:**  
`GET /api/booking/my-bookings`

**Headers:**  
- `Authorization: Bearer <JWT_TOKEN>`

**Response (201):**
```json
{
  "bookings": [
    {
      "_id": "<booking_id>",
      "package": {
        "_id": "<package_id>",
        "title": "Goa Adventure",
        "duration": "5 days",
        "price": 15000
      },
      "status": "pending",
      "travelers": [ ... ],
      "priceAtBooking": 15000,
      "createdAt": "...",
      "updatedAt": "..."
    }
    // ...more bookings
  ]
}
```

**Errors:**
- `401` Unauthorized

---

## 3. Update Booking Status (Admin Only)

**Endpoint:**  
`PATCH /api/booking/:bookingId`

**Headers:**  
- `Authorization: Bearer <JWT_TOKEN>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "status": "confirmed"
}
```
- Allowed values: `"pending"`, `"confirmed"`, `"completed"`, `"cancelled"`

**Response (201):**
```json
{
  "message": "status updated",
  "booking": {
    "_id": "<booking_id>",
    "status": "confirmed",
    // ...other booking fields
  }
}
```

**Errors:**
- `431` Validation error (invalid status)
- `421` Invalid booking status
- `401` Unauthorized
- `403` Forbidden (if not admin)

---

## Notes for Frontend

- All endpoints require JWT authentication via the `Authorization` header.
- Always validate user input before sending requests.
- For booking creation, ensure you collect all traveler details and the correct package ID.
- Only admin users can update booking status.