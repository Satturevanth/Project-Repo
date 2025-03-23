const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = "jhdbchjbskjcb46374683b4jhvjh5vjh352546jhvv"; // Change this to a strong secret key

// Dummy user credentials (Replace with a real database in production)
const users = [
  { username: "admin", password: "password123" },
  { username: "testuser", password: "test123" },
];

// Debugging: Check if the backend is running
app.get("/api/dashboard", (req, res) => {
    const sampleData = [{ name: "User 1" }, { name: "User 2" }]; // Dummy data
    res.json(sampleData);
  });
  

// Login API
app.post("/api/login", (req, res) => {
  console.log("Request received:", req.body); // Debugging line

  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    console.log("Invalid credentials"); // Debugging line
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
  console.log("Token generated:", token); // Debugging line

  res.json({ token });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
