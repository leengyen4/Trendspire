import React from 'react';
import PinItem from './PinItem';

const PinList = ({ pins = [], onPinDeleted, onPinUpdated, favorites, onFavoriteToggle }) => {
  return (
    <div className="pin-list">
      {pins.length > 0 ? (
        pins.map((pin) => (
          <PinItem
            key={pin.id}
            pin={pin}
            onPinDeleted={onPinDeleted}
            onPinUpdated={onPinUpdated}
            favorites={favorites} // Pass favorites
            onFavoriteToggle={onFavoriteToggle} // Pass favorite toggle function
          />
        ))
      ) : (
        <p>No pins available.</p>
      )}
    </div>
  );
};

export default PinList;
