const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = "jhdbchjbskjcb46374683b4jhvjh5vjh352546jhvv"; // Use a strong secret key

// Dummy user credentials (Replace with a real database in production)
const users = [
  { username: "admin", password: "password123" },
  { username: "testuser", password: "test123" },
];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "User not logged in" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Dashboard API (Protected Route)
app.get("/api/dashboard", verifyToken, (req, res) => {
    const sampleData = [{ name: "User 1" }, { name: "User 2" }]; // Dummy data
    res.json(sampleData);
});

// Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
});

// Add the /api/map Route (Protected)
app.get("/api/map", verifyToken, (req, res) => {
    res.json({
        center: [20.5937, 78.9629], // India coordinates
        zoom: 5
    });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));