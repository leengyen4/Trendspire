import React, { useState, useEffect } from 'react';
import PinItem from './PinItem';

const PinList = () => {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch('/api/pins');
        if (response.ok) {
          const data = await response.json();
          setPins(data);
        } else {
          console.error('Failed to fetch pins');
        }
      } catch (error) {
        console.error('Error fetching pins:', error);
      }
    };

    fetchPins();
  }, []);

  const handlePinDeleted = (id) => {
    setPins((prevPins) => prevPins.filter((pin) => pin.id !== id));
  };

  const handlePinUpdated = (updatedPin) => {
    setPins((prevPins) =>
      prevPins.map((pin) => (pin.id === updatedPin.id ? updatedPin : pin))
    );
  };

  return (
    <div className="pin-list">
      {pins.length > 0 ? (
        pins.map((pin) => (
          <PinItem
            key={pin.id}
            pin={pin}
            onPinDeleted={handlePinDeleted}
            onPinUpdated={handlePinUpdated}
          />
        ))
      ) : (
        <p>No pins available.</p>
      )}
    </div>
  );
};

export default PinList;
