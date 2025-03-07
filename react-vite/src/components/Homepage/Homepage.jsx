// src/components/Homepage/Homepage.jsx
import React from 'react';
import PinPage from '../PinPage/PinPage';  // Import PinPage to handle pin-related logic
import './Homepage.css'; // Optional: Add your custom styling for the homepage

const Homepage = () => {
  return (
    <div>
      <h1>Trendspire</h1>
      <PinPage /> {/* Render the PinPage component to handle pins */}
    </div>
  );
};

export default Homepage;
