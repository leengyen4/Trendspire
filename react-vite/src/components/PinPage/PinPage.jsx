import React, { useState, useEffect } from 'react';
import PinForm from './PinForm';  // Import PinForm to handle pin creation
import PinList from './PinList';  // Import the PinList component
import './PinItem.css';  // Make sure the styles for PinItem are included

const PinPage = () => {
  const [pins, setPins] = useState([]);  // Store all pins
  const [favorites, setFavorites] = useState([]); // Store user's favorite pins
  const [boards, setBoards] = useState([]); // Store user's boards

  // Fetch all pins, favorite pins, and boards data when the component mounts
  useEffect(() => {
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

    const fetchBoards = async () => {
      try {
        const response = await fetch('/api/boards', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBoards(data); // Set user's boards
        } else {
          console.error('Error fetching boards');
        }
      } catch (err) {
        console.error('Error fetching boards:', err);
      }
    };

    fetchPins();
    fetchFavorites();
    fetchBoards();
  }, []); // Empty dependency array, meaning this runs once when the component mounts

  const handleFavoriteToggle = async (pinId) => {
    const existingFavorite = favorites.find(fav => fav.pin_id === pinId);

    if (existingFavorite) {
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
          setFavorites(favorites.filter(fav => fav.pin_id !== pinId));
        } else {
          console.error('Failed to unfavorite the pin');
        }
      } catch (error) {
        console.error('Error unfavoriting pin:', error);
      }
    } else {
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

  const handleAddToBoard = (pinId, boardId) => {
    fetch(`/api/boardpins/${boardId}/pins/${pinId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Pin added to board successfully!');
        } else {
          console.error('Failed to add pin to board');
        }
      })
      .catch((error) => {
        console.error('Error adding pin to board:', error);
      });
  };

  return (
    <div>
      <h1>All Pins</h1>

      {/* Use PinList to display all pins */}
      <PinList
        pins={pins}
        onPinDeleted={(id) => setPins(pins.filter(pin => pin.id !== id))}
        onPinUpdated={(updatedPin) => setPins(pins.map(pin => pin.id === updatedPin.id ? updatedPin : pin))}
        onFavoriteToggle={handleFavoriteToggle}
        favorites={favorites}
        onAddToBoard={handleAddToBoard}
        boards={boards} // Pass the boards to PinList component
      />

      {/* Move the PinForm (create pin) to the bottom */}
      <PinForm onPinCreated={(newPin) => setPins([newPin, ...pins])} />
    </div>
  );
};

export default PinPage;
