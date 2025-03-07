// src/components/PinPage/PinList.jsx
import React from 'react';
import PinItem from './PinItem';

const PinList = ({ pins = [], onPinDeleted, onPinUpdated }) => {
  return (
    <div className="pin-list">
      {pins.length > 0 ? (
        pins.map((pin) => (
          <PinItem
            key={pin.id}
            pin={pin}
            onPinDeleted={onPinDeleted}
            onPinUpdated={onPinUpdated}
          />
        ))
      ) : (
        <p>No pins available.</p>
      )}
    </div>
  );
};

export default PinList;
