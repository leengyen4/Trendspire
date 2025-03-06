// src/components/PinPage/PinList.jsx
import React, { useState, useEffect } from 'react';
import PinItem from './PinItem.jsx';  

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

  return (
    <div className="pin-list">
      {pins.length > 0 ? (
        pins.map(pin => <PinItem key={pin.id} pin={pin} />)
      ) : (
        <p>No pins available.</p>
      )}
    </div>
  );
};

export default PinList;
