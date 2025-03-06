import React, { useState, useEffect } from 'react';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [allPins, setAllPins] = useState([]);
  
  useEffect(() => {
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
          console.error('Failed to fetch favorites');
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    // Fetch all available pins to allow favoriting/unfavoriting
    const fetchPins = async () => {
      try {
        const response = await fetch('/api/pins', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAllPins(data); // Set all pins
        } else {
          console.error('Failed to fetch pins');
        }
      } catch (error) {
        console.error('Error fetching pins:', error);
      }
    };

    fetchFavorites();
    fetchPins();
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
      <h1>Your Favorite Pins</h1>
      <div className="pin-list">
        {allPins.map((pin) => (
          <div key={pin.id} className="pin-card">
            <img src={pin.image_url} alt={pin.name} />
            <h3>{pin.name}</h3>
            <button
              onClick={() => handleFavoriteToggle(pin.id)}
              className={favorites.some(fav => fav.pin_id === pin.id) ? 'favorited' : ''}
            >
              {favorites.some(fav => fav.pin_id === pin.id) ? 'Unfavorite' : 'Favorite'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
