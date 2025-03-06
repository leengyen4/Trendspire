// src/components/PinPage/PinItem.jsx
import React from 'react';

const PinItem = ({ pin }) => {
  const handleDelete = async () => {
    const response = await fetch(`/api/pins/${pin.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      alert('Pin deleted successfully!');
      // Optionally, you can refresh the pin list after deletion
      window.location.reload();
    } else {
      alert('Failed to delete the pin.');
    }
  };

  return (
    <div className="pin-item">
      <h3>{pin.title}</h3>
      <img src={pin.image_url} alt={pin.title} />
      <p>{pin.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PinItem;
