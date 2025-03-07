// src/components/PinPage/PinPage.jsx
import React, { useState, useEffect } from 'react';
import PinForm from './PinForm';
import PinList from './PinList';
import { useParams } from 'react-router-dom';
import CommentComponent from '../Comment/CommentComponent'; // Import the CommentComponent
import './PinItem.css';

const PinPage = () => {
  const [pins, setPins] = useState([]); // Store all pins

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
      <PinForm onPinCreated={handlePinCreated} />
      
      <PinList
        pins={pins} // Pass the list of pins to PinList
        onPinDeleted={handlePinDeleted} // Pass delete handler
        onPinUpdated={handlePinUpdated} // Pass update handler
      />

      {/* Render CommentComponent below each pin */}
      {pins.map((pin) => (
        <div key={pin.id}>
          <h3>{pin.title}</h3>
          {/* Pass pinId to the CommentComponent for each pin */}
          <CommentComponent pinId={pin.id} />
        </div>
      ))}
    </div>
  );
};

export default PinPage;
