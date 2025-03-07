import React, { useState, useEffect } from 'react';
import PinForm from './PinForm';
import PinList from './PinList';  // Import the PinList component
import './PinItem.css';  // Make sure the styles for PinItem are included

const PinPage = () => {
  const [pins, setPins] = useState([]);  // Store all pins

  // Fetch all pins data when the component mounts
  useEffect(() => {
    fetch('/api/pins') // Fetch all pins from the server
      .then((res) => res.json())
      .then((data) => {
        setPins(data); // Set the fetched pins data
      })
      .catch((err) => {
        console.error('Error fetching pins:', err);
      });
  }, []); // Empty array to only run once on mount

  // Handle pin creation
  const handlePinCreated = (newPin) => {
    setPins((prevPins) => [newPin, ...prevPins]); // Add new pin to the list
  };

  // Handle pin deletion
  const handlePinDeleted = (id) => {
    setPins((prevPins) => prevPins.filter((pin) => pin.id !== id)); // Remove deleted pin from state
  };

  // Handle pin update
  const handlePinUpdated = (updatedPin) => {
    setPins((prevPins) =>
      prevPins.map((pin) => (pin.id === updatedPin.id ? updatedPin : pin))
    ); // Update the pin in state
  };

  return (
    <div>
      <h1>All Pins</h1>
      <PinForm onPinCreated={handlePinCreated} /> {/* Pin creation form */}

      {/* Use PinList to display all pins */}
      <PinList
        pins={pins}  // Pass the list of pins to PinList
        onPinDeleted={handlePinDeleted}  // Pass delete handler to PinList
        onPinUpdated={handlePinUpdated}  // Pass update handler to PinList
      />
    </div>
  );
};

export default PinPage;
