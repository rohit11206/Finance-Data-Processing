```
# 📊 Finance Data Processing & Access Control Backend

## 🚀 Project Overview

This project is a backend system for a **Finance Dashboard Application** that allows users to manage financial records and view analytical insights based on their roles.

It demonstrates:

* Role-Based Access Control (RBAC)
* Secure authentication using JWT
* Financial data management
* Aggregated analytics for dashboards

---

## 🧠 Key Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Role-based access control:

  * **User** → manage own records
  * **Analyst** → view records & analytics
  * **Admin** → full access (users + records)

---

### 👥 User Management

* Admin can:

  * View all users
  * Update user role & status
  * Delete users
* Users cannot access other users' data

---

### 💰 Financial Records

* Create, read, update, delete records
* Fields:

  * amount
  * type (income / expense)
  * category
  * date
  * notes
* Filtering and pagination supported

---

### 📊 Dashboard Analytics

* Total income & expense
* Net balance
* Category-wise breakdown
* Monthly trends
* Recent transactions

---

### 🔒 Password Management

* Forgot password (email-based reset)
* Secure token-based reset with expiry
* Tokens stored in hashed format

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Validation:** Zod
* **Email Service:** Nodemailer

---

## 📁 Project Structure

```
src/
│── controllers/
│── models/
│── routes/
│── middlewares/
│── validators/
│── utils/
│── services/
│── config/
│── seeds/
```

---

## 🔐 Roles & Permissions

| Role    | Permissions                               |
| ------- | ----------------------------------------- |
| User    | Manage own records, view dashboard        |
| Analyst | View all records, access analytics        |
| Admin   | Full access (users + records + analytics) |

---

## 📡 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint                  | Description       |
| ------ | ------------------------- | ----------------- |
| POST   | /api/auth/register        | Register new user |
| POST   | /api/auth/login           | Login user        |
| POST   | /api/auth/forgot-password | Send reset email  |
| POST   | /api/auth/reset-password  | Reset password    |

---

### 👥 User Routes (Admin Only)

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| GET    | /api/users     | Get all users      |
| GET    | /api/users/:id | Get user by ID     |
| PUT    | /api/users/:id | Update role/status |
| DELETE | /api/users/:id | Delete user        |

---

### 💰 Record Routes

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| POST   | /api/records     | Create record                  |
| GET    | /api/records     | Get records (filtered by role) |
| GET    | /api/records/:id | Get record by ID               |
| PUT    | /api/records/:id | Update record                  |
| DELETE | /api/records/:id | Delete record                  |

---

### 📊 Dashboard Routes

| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| GET    | /api/dashboard/summary        | Income, expense, balance |
| GET    | /api/dashboard/category-stats | Category breakdown       |
| GET    | /api/dashboard/monthly-trends | Monthly analytics        |
| GET    | /api/dashboard/recent-records | Recent transactions      |

---

## ⚙️ Assumptions Made
*Users are created through the registration endpoint only
*By default, every newly registered user is assigned the "user" role
*Only an admin can assign or update roles (user → analyst/admin)
*Only admin can manage users (view, update, delete)
*Users can only access and manage their own records
*Analysts can view all records and analytics, but cannot modify data
*Email verification is not implemented to simplify testing
*Password reset is handled using a secure token-based email flow
*A default admin user is created using a seed script
* Password reset uses email-based token system

---

## 🔐 Security Considerations

* Passwords are hashed using bcrypt
* JWT used for secure authentication
* Reset tokens are stored in hashed format
* Role-based and ownership-based access control enforced
* Sensitive fields like passwords are excluded from responses

---

## 🧪 Testing

* APIs tested using Postman
* Validation ensures correct input handling
* Error handling implemented for all endpoints

---

## 🚀 How to Run

```bash
npm install
npm run dev
```

---

## 📌 Environment Variables

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
ADMIN_PASSWORD=Your_admin_password
```

---

## 🎯 Future Improvements

* Email verification system
* Advanced filtering & search
* Rate limiting
* Logging system
* Unit & integration testing

---

## 💬 Final Note

This project focuses on **clean backend architecture, secure data handling, and scalable API design**, rather than unnecessary complexity.

---

## 👨‍💻 Author

Developed as part of a backend engineering assessment.

```