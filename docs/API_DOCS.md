# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except `/auth/login` and `/auth/register`) require JWT authentication.

Add the token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "John Doe",
  "role": "RESPONDER"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "RESPONDER"
  },
  "token": "jwt_token_here"
}
```

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "RESPONDER"
  },
  "token": "jwt_token_here"
}
```

---

## Incident Endpoints

### Get All Incidents
```http
GET /incidents
```

**Response (200):**
```json
{
  "incidents": [
    {
      "id": "uuid",
      "title": "Building Fire",
      "description": "Large building fire in downtown",
      "type": "FIRE",
      "severity": "CRITICAL",
      "status": "OPEN",
      "location": "123 Main St",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "created_at": "2026-06-06T10:30:00Z",
      "updated_at": "2026-06-06T10:35:00Z"
    }
  ]
}
```

### Get Incident by ID
```http
GET /incidents/:id
```

**Response (200):**
```json
{
  "incident": {
    "id": "uuid",
    "title": "Building Fire",
    "description": "Large building fire in downtown",
    "type": "FIRE",
    "severity": "CRITICAL",
    "status": "OPEN",
    "location": "123 Main St",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "created_at": "2026-06-06T10:30:00Z",
    "updated_at": "2026-06-06T10:35:00Z"
  }
}
```

### Create Incident
```http
POST /incidents
```

**Request Body:**
```json
{
  "title": "Building Fire",
  "description": "Large building fire in downtown",
  "type": "FIRE",
  "severity": "CRITICAL",
  "location": "123 Main St",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Response (201):**
```json
{
  "incident": {
    "id": "uuid",
    "title": "Building Fire",
    "description": "Large building fire in downtown",
    "type": "FIRE",
    "severity": "CRITICAL",
    "status": "OPEN",
    "location": "123 Main St",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "created_at": "2026-06-06T10:30:00Z",
    "updated_at": "2026-06-06T10:30:00Z"
  }
}
```

### Update Incident
```http
PUT /incidents/:id
```

**Request Body:**
```json
{
  "status": "IN_PROGRESS",
  "severity": "HIGH",
  "notes": "Fire partially controlled"
}
```

**Response (200):**
```json
{
  "incident": {
    "id": "uuid",
    "title": "Building Fire",
    "description": "Large building fire in downtown",
    "type": "FIRE",
    "severity": "HIGH",
    "status": "IN_PROGRESS",
    "location": "123 Main St",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "notes": "Fire partially controlled",
    "created_at": "2026-06-06T10:30:00Z",
    "updated_at": "2026-06-06T10:40:00Z"
  }
}
```

---

## Resource Endpoints

### Get All Resources
```http
GET /resources
```

**Response (200):**
```json
{
  "resources": [
    {
      "id": "uuid",
      "name": "Fire Truck 01",
      "type": "fire_truck",
      "status": "AVAILABLE",
      "location": "Fire Station 1",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "capacity": 4,
      "current_load": 0,
      "created_at": "2026-06-06T10:00:00Z"
    }
  ]
}
```

### Create Resource
```http
POST /resources
```

**Request Body:**
```json
{
  "name": "Ambulance 01",
  "type": "ambulance",
  "status": "AVAILABLE",
  "location": "Hospital 1",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "capacity": 2
}
```

**Response (201):**
```json
{
  "resource": {
    "id": "uuid",
    "name": "Ambulance 01",
    "type": "ambulance",
    "status": "AVAILABLE",
    "location": "Hospital 1",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "capacity": 2,
    "current_load": 0,
    "created_at": "2026-06-06T10:00:00Z"
  }
}
```

---

## Alert Endpoints

### Get All Alerts
```http
GET /alerts
```

**Response (200):**
```json
{
  "alerts": [
    {
      "id": "uuid",
      "incident_id": "uuid",
      "title": "Critical Fire Alert",
      "message": "Massive fire detected in downtown",
      "severity": "CRITICAL",
      "recipients": ["dispatcher1", "chief1"],
      "created_at": "2026-06-06T10:30:00Z",
      "read_at": null
    }
  ]
}
```

### Create Alert
```http
POST /alerts
```

**Request Body:**
```json
{
  "incident_id": "uuid",
  "title": "Critical Fire Alert",
  "message": "Massive fire detected in downtown",
  "severity": "CRITICAL",
  "recipients": ["dispatcher1", "chief1"]
}
```

**Response (201):**
```json
{
  "alert": {
    "id": "uuid",
    "incident_id": "uuid",
    "title": "Critical Fire Alert",
    "message": "Massive fire detected in downtown",
    "severity": "CRITICAL",
    "recipients": ["dispatcher1", "chief1"],
    "created_at": "2026-06-06T10:30:00Z"
  }
}
```

---

## Dashboard Endpoints

### Get Dashboard Statistics
```http
GET /dashboard/stats
```

**Response (200):**
```json
{
  "totalIncidents": 45,
  "openIncidents": 8,
  "criticalIncidents": 2,
  "availableResources": 23
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "error": {
    "message": "Invalid input parameters",
    "statusCode": 400
  }
}
```

### 401 - Unauthorized
```json
{
  "error": {
    "message": "Access token required",
    "statusCode": 401
  }
}
```

### 403 - Forbidden
```json
{
  "error": {
    "message": "Invalid or expired token",
    "statusCode": 403
  }
}
```

### 404 - Not Found
```json
{
  "error": {
    "message": "Resource not found",
    "statusCode": 404
  }
}
```

### 500 - Internal Server Error
```json
{
  "error": {
    "message": "Internal server error",
    "statusCode": 500
  }
}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |
