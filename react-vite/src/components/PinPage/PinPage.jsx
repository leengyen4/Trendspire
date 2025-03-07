import React, { useState, useEffect } from 'react';
import PinForm from './PinForm';
import PinList from './PinList';  // Import the PinList component
import './PinItem.css';  // Make sure the styles for PinItem are included

const PinPage = () => {
  const [pins, setPins] = useState([]);  // Store all pins
  const [favorites, setFavorites] = useState([]); // Store user's favorite pins

  // Fetch all pins and favorite pins data when the component mounts
  useEffect(() => {
    // Fetch all pins data
    const fetchPins = async () => {
      try {
        const response = await fetch('/api/pins');
        if (response.ok) {
          const data = await response.json();
          setPins(data); // Set the fetched pins data
        } else {
          console.error('Error fetching pins');
        }
      } catch (err) {
        console.error('Error fetching pins:', err);
      }
    };

    // Fetch user's favorite pins
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFavorites(data); // Set user's favorites
        } else {
          console.error('Error fetching favorites');
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };

    fetchPins();
    fetchFavorites();
  }, []);

  const handleFavoriteToggle = async (pinId) => {
    // Check if the pin is already favorited by the user
    const existingFavorite = favorites.find(fav => fav.pin_id === pinId);

    if (existingFavorite) {
      // Unfavorite the pin
      try {
        const response = await fetch('/api/favorites', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin_id: pinId }),
        });

        if (response.ok) {
          setFavorites(favorites.filter(fav => fav.pin_id !== pinId)); // Remove from UI
        } else {
          console.error('Failed to unfavorite the pin');
        }
      } catch (error) {
        console.error('Error unfavoriting pin:', error);
      }
    } else {
      // Favorite the pin
      try {
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin_id: pinId }),
        });

        if (response.ok) {
          const newFavorite = await response.json();
          setFavorites([...favorites, newFavorite]); // Add to UI
        } else {
          console.error('Failed to favorite the pin');
        }
      } catch (error) {
        console.error('Error favoriting pin:', error);
      }
    }
  };

  return (
    <div>
      <h1>All Pins</h1>
      <PinForm onPinCreated={(newPin) => setPins([newPin, ...pins])} /> {/* Pin creation form */}

      {/* Use PinList to display all pins */}
      <PinList
        pins={pins}  // Pass the list of pins to PinList
        onPinDeleted={(id) => setPins(pins.filter(pin => pin.id !== id))}
        onPinUpdated={(updatedPin) => setPins(pins.map(pin => pin.id === updatedPin.id ? updatedPin : pin))}
        onFavoriteToggle={handleFavoriteToggle}  // Pass the favorite/unfavorite handler
        favorites={favorites} // Pass the list of favorites
      />
    </div>
  );
};

export default PinPage;
