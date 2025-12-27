# User Authentication & Profile API Documentation

This document describes the REST API endpoints for user registration, login, Google Sign-In, logout, and user profile retrieval.

---

## 1. Register User

**Endpoint:**  
`POST /api/v1/register`

**Headers:**  
- `Content-Type: application/json`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "Fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

**Response (201):**
```json
{
  "user": {
    "_id": "<user_id>",
    "email": "user@example.com",
    "Fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "role": "user",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Errors:**
- `400` Validation errors (missing/invalid fields)
- `401` User already exists or missing credentials

---

## 2. Login (Email & Password)

**Endpoint:**  
`POST /api/v1/login`

**Headers:**  
- `Content-Type: application/json`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response (200):**
```json
{
  "message": "Logged in",
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "<user_id>",
    "email": "user@example.com"
  }
}
```
- JWT token is also set as an HTTP-only cookie.

**Errors:**
- `400` Validation errors
- `420` Missing credentials
- `421` User not registered
- `422` Incorrect email or password

---

## 3. Google Sign-In

**Endpoint:**  
`POST /api/v1/google`

**Headers:**  
- `Content-Type: application/json`

**Request Body:**
```json
{
  "idToken": "<google_id_token>"
}
```

**Response (200):**
```json
{
  "message": "Logged in with Google",
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "<user_id>",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```
- JWT token is also set as an HTTP-only cookie.

**Errors:**
- `400` idToken missing
- `401` Invalid Google token or payload
- `403` Google account email not verified
- `409` Account conflict

---

## 4. Logout

**Endpoint:**  
`POST /api/v1/logout`

**Headers:**  
- `Authorization: Bearer <JWT_TOKEN>` (or rely on cookie)

**Response (200):**
```json
{
  "message": "Logged out"
}
```

---

## 5. Get Current User Details

**Endpoint:**  
`GET /api/v1/me`

**Headers:**  
- `Authorization: Bearer <JWT_TOKEN>` (or rely on cookie)

**Response (200):**
```json
{
  "user": {
    "_id": "<user_id>",
    "email": "user@example.com",
    "Fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "role": "user",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Errors:**
- `401` Authentication token missing/invalid
- `404` User not found

---

## Notes for Frontend

- All endpoints expect and return JSON.
- For protected routes, send the JWT token in the `Authorization` header as `Bearer <token>` or rely on the HTTP-only cookie.
- On successful login/register, store the token for subsequent requests.
- Google Sign-In requires a valid Google ID token from the frontend.
- Always validate user input on the frontend before sending requests.

---