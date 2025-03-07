// src/components/PinPage/PinPage.jsx
import React, { useState, useEffect } from 'react';
import PinForm from './PinForm';
import PinList from './PinList';
import { useParams } from 'react-router-dom';
import CommentComponent from '../Comment/CommentComponent'; // Import the CommentComponent
import './PinItem.css';

const PinPage = () => {
  const [pins, setPins] = useState([]);
  const { pinId } = useParams(); // Get pinId from the URL (optional, for individual pin details)

  // Fetch pins data when the component mounts
  useEffect(() => {
    fetch('/api/pins') // Assuming '/api/pins' is the correct endpoint
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
        pins={pins} // Pass the pins to PinList
        onPinDeleted={handlePinDeleted} // Pass delete handler
        onPinUpdated={handlePinUpdated} // Pass update handler
      />

      {/* Check if pinId exists before rendering the comments */}
      {pinId && <CommentComponent pinId={pinId} />} {/* Pass pinId to CommentComponent */}
    </div>
  );
};

export default PinPage;

