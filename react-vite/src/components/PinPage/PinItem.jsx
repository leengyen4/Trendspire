import React, { useState } from 'react';
import CommentComponent from '../Comment/CommentComponent'; // Import CommentComponent

const PinItem = ({ pin, onPinDeleted, onPinUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(pin.title);
  const [updatedDescription, setUpdatedDescription] = useState(pin.description);
  const [updatedImageUrl, setUpdatedImageUrl] = useState(pin.image_url);

  // Delete Pin
  const handleDelete = async () => {
    const response = await fetch(`/api/pins/${pin.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      alert('Pin deleted successfully!');
      onPinDeleted(pin.id); // Remove pin from parent component's state
    } else {
      alert('You cannot delete a pin that is not yours.');
    }
  };

  // Update Pin
  const handleUpdate = async () => {
    const updatedPin = {
      title: updatedTitle,
      description: updatedDescription,
      image_url: updatedImageUrl,
    };

    const response = await fetch(`/api/pins/${pin.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedPin),
    });

    if (response.ok) {
      const data = await response.json();
      onPinUpdated(data); // Update pin in parent component's state
      setIsEditing(false); // Close the editing form
    } else {
      alert('You cannot change a pin that is not yours.');
    }
  };

  return (
    <div className="pin-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <input
            type="text"
            value={updatedImageUrl}
            onChange={(e) => setUpdatedImageUrl(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{pin.title}</h3>
          <img src={pin.image_url} alt={pin.title} className="pin-image" />
          <p>{pin.description}</p>
          {/* Update and Delete buttons for pins */}
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      
      {/* Render CommentComponent with pinId */}
      <CommentComponent pinId={pin.id} />
    </div>
  );
};

export default PinItem;
