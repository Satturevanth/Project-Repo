import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [mapData, setMapData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const token = localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQyNzQxODYwLCJleHAiOjE3NDI3NDU0NjB9.NGWY6Db9UYmRUSVdXIk4TEa2NlmelL4Oymqy4FeF4-U"); // Get JWT token from localStorage
        if (!token) {
          setError("No token found. Please login again.");
          return;
        }

        const response = await axios.get('https://project-repo-2.onrender.com/api/map', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token as a Bearer header
          },
        });

        setMapData(response.data);
      } catch (err) {
        setError("Failed to fetch map data. Please login again.");
      }
    };

    fetchMapData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1>Map View</h1>
      <MapContainer center={mapData ? mapData.center : [20.5937, 78.9629]} zoom={mapData ? mapData.zoom : 5} style={{ height: "500px", width: "80%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default MapView;
