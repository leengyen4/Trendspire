import React, { useState, useEffect } from 'react';
import PinForm from './PinForm';
import PinList from './PinList';
import { useParams } from 'react-router-dom';
import CommentComponent from '../Comment/CommentComponent';  // Import the CommentComponent
import './PinItem.css';

const PinPage = () => {
  const [pin, setPin] = useState(null);  // Store the single pin fetched by pinId
  const { pinId } = useParams(); // Get pinId from the URL (optional, for individual pin details)

  // Fetch pin data when the component mounts or when pinId changes
  useEffect(() => {
    fetch(`/api/pins/${pinId}`) // Fetch a specific pin by pinId
      .then((res) => res.json())
      .then((data) => {
        setPin(data); // Set the fetched pin data
      })
      .catch((err) => {
        console.error('Error fetching pin:', err);
      });
  }, [pinId]);  // Run when pinId changes

  if (!pin) {
    return <p>Loading pin...</p>; // Loading state while the pin is being fetched
  }

  return (
    <div>
      <h1>{pin.title}</h1>
      <PinForm />
      <PinList />
      {/* Render CommentComponent below the pin */}
      <CommentComponent pinId={pinId} />  {/* Pass pinId to CommentComponent */}
    </div>
  );
};

export default PinPage;
