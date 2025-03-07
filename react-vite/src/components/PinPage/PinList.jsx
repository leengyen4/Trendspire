import React from 'react';
import PinItem from './PinItem'; // Import the PinItem component

const PinList = ({ pins, onPinDeleted, onPinUpdated, onFavoriteToggle, favorites, onAddToBoard, boards }) => {
  return (
    <div className="pin-list">
      {pins.length > 0 ? (
        pins.map((pin) => (
          <PinItem
            key={pin.id}
            pin={pin}
            onPinDeleted={onPinDeleted}
            onPinUpdated={onPinUpdated}
            onFavoriteToggle={onFavoriteToggle}
            favorites={favorites}
            onAddToBoard={onAddToBoard}
            boards={boards} // Pass the boards to each PinItem
          />
        ))
      ) : (
        <p>No pins available.</p>
      )}
    </div>
  );
};

export default PinList;
