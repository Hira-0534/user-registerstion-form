const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Engineer@0534", // Replace with your MySQL password
    database: "hira"
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Database");
});

// --- LOGIN HANDLING ---
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const trimmedEmail = email.trim();

    const sql = "SELECT * FROM user WHERE email = ?";
    conn.query(sql, [trimmedEmail], (err, result) => {
        if (err) return res.status(500).send("Database Error");

        // CASE 1: Account doesn't exist
        if (result.length === 0) {
            return res.send(`
                <div style="text-align:center; font-family:Arial; margin-top:50px;">
                    <h3 style="color:orange;">Account Not Found!</h3>
                    <p>This email is not registered. Please register first.</p>
                    <a href="/" style="padding:10px 20px; background:#18a2b8; color:white; text-decoration:none; border-radius:5px;">Register Now</a>
                </div>
            `);
        }

        const user = result[0];

        // CASE 2: Incorrect password
        if (user.password !== password) {
            return res.send(`
                <div style="text-align:center; font-family:Arial; margin-top:50px;">
                    <h3 style="color:red;">Incorrect Password!</h3>
                    <p>You entered the wrong password.</p>
                    <a href="/login" style="padding:10px 20px; background:#6c757d; color:white; text-decoration:none; border-radius:5px;">Try Again</a>
                </div>
            `);
        }

        // CASE 3: Correct login
        res.sendFile(path.join(__dirname, 'dashboard.html'));
    });
});

// --- REGISTRATION HANDLING ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration.html'));
});

app.post(['/', '/register'], (req, res) => {
    const { firstName, surname, email, password } = req.body;
    const fullName = firstName + " " + surname;

    const checkSql = "SELECT * FROM user WHERE email = ?";
    conn.query(checkSql, [email.trim()], (err, result) => {
        if (err) return res.status(500).send("Database Error");

        // CASE 1: Account already exists
        if (result.length > 0) {
            return res.send(`
                <div style="text-align:center; font-family:Arial; margin-top:50px;">
                    <h3 style="color:orange;">Email Already Registered!</h3>
                    <p>An account already exists with this email.</p>
                    <a href="/login" style="padding:10px 20px; background:#18a2b8; color:white; text-decoration:none; border-radius:5px;">Login Now</a>
                </div>
            `);
        }

        // CASE 2: Insert new account
        const sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
        conn.query(sql, [fullName, email.trim(), password], (err, result) => {
            if (err) return res.status(500).send("Registration Error");
            res.sendFile(path.join(__dirname, 'success.html'));
        });
    });
});

// Start server
app.listen(3001, () => console.log("Server running at http://localhost:3001"));
