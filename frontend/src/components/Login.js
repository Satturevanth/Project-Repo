import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login request to backend
      const res = await axios.post('https://project-repo-2.onrender.com/api/login', { username, password });
      
      // Store the JWT token received from the backend in localStorage
      localStorage.setItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQyNzQxODYwLCJleHAiOjE3NDI3NDU0NjB9.NGWY6Db9UYmRUSVdXIk4TEa2NlmelL4Oymqy4FeF4-U", res.data.token);
      
      // Set authentication state to true
      setAuth(true);
      
      // Redirect to the dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      // If login fails, show error message
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container d-flex flex-column justify-content-center">
      <div className="login-card">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <form className="ree">
          <input className="check" type="checkbox" name="rr" value="on" />
          <p className="para">Remember Me</p>
        </form>
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
