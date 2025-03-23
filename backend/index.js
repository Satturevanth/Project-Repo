const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

<<<<<<< HEAD
const SECRET_KEY = "jhdbchjbskjcb46374683b4jhvjh5vjh352546jhvv"; // Change this to a strong secret key
=======
const SECRET_KEY = "jhdbchjbskjcb46374683b4jhvjh5vjh352546jhvv"; // Use a strong secret key
>>>>>>> 15ba810 (Added /api/map route)

// Dummy user credentials (Replace with a real database in production)
const users = [
  { username: "admin", password: "password123" },
  { username: "testuser", password: "test123" },
];

<<<<<<< HEAD
// Debugging: Check if the backend is running
app.get("/api/dashboard", (req, res) => {
    const sampleData = [{ name: "User 1" }, { name: "User 2" }]; // Dummy data
    res.json(sampleData);
  });
  

// Login API
app.post("/api/login", (req, res) => {
  console.log("Request received:", req.body); // Debugging line
=======
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
  console.log("Request received:", req.body);
>>>>>>> 15ba810 (Added /api/map route)

  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
<<<<<<< HEAD
    console.log("Invalid credentials"); // Debugging line
=======
    console.log("Invalid credentials");
>>>>>>> 15ba810 (Added /api/map route)
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
<<<<<<< HEAD
  console.log("Token generated:", token); // Debugging line
=======
  console.log("Token generated:", token);
>>>>>>> 15ba810 (Added /api/map route)

  res.json({ token });
});

<<<<<<< HEAD
=======
// ✅ Add the /api/map Route (Protected)
app.get("/api/map", verifyToken, (req, res) => {
    res.json({
        center: [20.5937, 78.9629], // India coordinates
        zoom: 5
    });
});

>>>>>>> 15ba810 (Added /api/map route)
// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
