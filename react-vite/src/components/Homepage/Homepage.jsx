import React from 'react';
import { Link } from 'react-router-dom';
import PinPage from '../PinPage/PinPage';  // Import PinPage to handle pin-related logic
import './Homepage.css'; // Optional: Add your custom styling for the homepage

const Homepage = () => {
  return (
    <div>
      <h1>Trendspire</h1>
      
      {/* Buttons to navigate to Favorite and Boards */}
      <div className="navigation-buttons">
        <Link to="/favorites">
          <button className="nav-button">Favorites</button>
        </Link>
        <Link to="/boards">
          <button className="nav-button">Boards</button>
        </Link>
      </div>

      {/* Render the PinPage component to handle pins */}
      <PinPage />
    </div>
  );
};

export default Homepage;
