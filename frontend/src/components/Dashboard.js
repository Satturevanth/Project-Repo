import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("54477"); // Stores unique 5-digit ID

  // Fetch dashboard data & check authentication
  useEffect(() => {
    const token = localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQyNjU1MTM3LCJleHAiOjE3NDI2NTg3Mzd9.A74oWDybiOgDKzQhxKQQRxx2z5-VZ5A4yY-C-slEH5s");

    if (!token) {
      navigate("/"); // Redirect to login if no token
      return;
    }

    // Simulating API call to get user details (replace with actual API)
    axios.get("http://localhost:5000/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      // Generating a random 5-digit unique ID
      const generatedId = Math.floor(10000 + Math.random() * 90000);
      setUserId(generatedId);
    })
    .catch(() => {
      alert("Session expired, please log in again");
      handleLogout();
    });

  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQyNjU1MTM3LCJleHAiOjE3NDI2NTg3Mzd9.A74oWDybiOgDKzQhxKQQRxx2z5-VZ5A4yY-C-slEH5s");  // Remove JWT token from frontend
    window.location.href = "/";  // Redirect to login page
  };

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#f0f2f5" }}>
      
      <h1>Welcome to Dashboard</h1>
      
      {/* Profile Section */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", textAlign: "center", width: "300px" }}>
        <h3>Profile</h3>
        <img 
            src="https://cdn.vectorstock.com/i/500p/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg" 
            alt="User profile"  //  No redundant words
            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} 
            style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }} 
        />


        <p><strong>Unique ID:</strong> {userId}</p>
        
        {/* Open Map View Button */}
        <button 
          onClick={() => navigate("/map")}
          style={{ padding: "10px", margin: "10px 0", background: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}
        >
          Map View
        </button>
        <br/>
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          style={{ padding: "10px", background: "red", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Dashboard;
