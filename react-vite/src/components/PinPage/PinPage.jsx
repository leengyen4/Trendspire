// src/components/PinPage/PinPage.jsx
import React, { useState } from 'react';
import PinForm from './PinForm';
import PinList from './PinList';

const PinPage = () => {
  const [pins, setPins] = useState([]);

  const handlePinCreated = (newPin) => {
    setPins((prevPins) => [newPin, ...prevPins]);  // Add new pin to the list
  };

  return (
    <div>
      <h1>All Pins</h1>
      <PinForm onPinCreated={handlePinCreated} />
      <PinList pins={pins} />
    </div>
  );
};

export default PinPage;
