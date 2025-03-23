import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQyNzQxODYwLCJleHAiOjE3NDI3NDU0NjB9.NGWY6Db9UYmRUSVdXIk4TEa2NlmelL4Oymqy4FeF4-U");
    setIsAuthenticated(!!token); // Convert token to boolean
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setAuth={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setIsAuthenticated} /> : <Navigate to="/" />} />
        <Route path="/map" element={isAuthenticated ? <MapView /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
