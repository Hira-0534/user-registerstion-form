# User Registration & Login System (Backend)

## 📌 Project Overview

This project is a **backend-based User Registration and Login system** developed as part of an **EAD / Web Engineering assignment**. The system allows users to register and log in using a **MySQL database** for data storage.

The project focuses on **server-side authentication**, database connectivity, and API response handling.

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* **MySQL**
* bcrypt (for password hashing)
* JSON Web Token (JWT) *(optional)*

---

## ✨ Features

* User Registration API
* User Login API
* Secure Password Hashing
* MySQL Database Integration
* Proper Success & Error Responses

---

## 🗄️ Database Setup (MySQL)

### 1️⃣ Create Database

```sql
CREATE DATABASE user_auth;
```

### 2️⃣ Create Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);
```

---

## 🚀 How to Run the Project

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Configure Database

* Update MySQL credentials in `db.js`

### 3️⃣ Run Server

```bash
node server.js
```

Server will run on: `http://localhost:3000` or `http://localhost:5000`

---

## 🔐 API Endpoints

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| POST   | /register | Register a new user |
| POST   | /login    | Login existing user |

---

## 🧪 Testing

* APIs tested using **Postman**
* Data sent in **JSON format**

---

## ⚠️ Notes

* If backend does not return a response, frontend may show a blank screen.
* Always ensure MySQL server is running before starting the backend.

---

## 📌 Future Improvements

* Add authentication middleware
* Connect frontend
* Improve validation and security

---

## 👩‍💻 Author

**Hira Shahid**

---

## 📜 License

This project is developed for educational purposes only.
