import React, { useState, useEffect } from 'react';
import PinForm from './PinForm';
import PinList from './PinList';
import { useParams } from 'react-router-dom';
import CommentComponent from '../Comment/Comment'; // Import the CommentComponent

const PinPage = () => {
  const [pins, setPins] = useState([]);
  const { pinId } = useParams(); // Get pinId from the URL

  // Fetch pins data when the component mounts
  useEffect(() => {
    fetch('/api/pins') // Assuming '/api/pins' is the correct endpoint
      .then(res => res.json())
      .then(data => {
        setPins(data);  // Set the fetched pins data
      })
      .catch(err => {
        console.error('Error fetching pins:', err);
      });
  }, []); // Empty array to only run once on mount

  const handlePinCreated = (newPin) => {
    setPins((prevPins) => [newPin, ...prevPins]);  // Add new pin to the list
  };

  return (
    <div>
      <h1>All Pins</h1>
      <PinForm onPinCreated={handlePinCreated} />
      <PinList pins={pins} />

      {/* Check if pinId exists before rendering the comments */}
      {pinId && <CommentComponent pinId={pinId} />}  {/* Pass pinId to CommentComponent */}
    </div>
  );
};

export default PinPage;
