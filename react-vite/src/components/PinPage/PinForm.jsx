// src/components/PinPage/PinForm.jsx
import React, { useState } from 'react';

const PinForm = ({ onPinCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      title,
      description,
      image_url: imageUrl,
    };

    try {
      const response = await fetch('/api/pins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newPin),
      });

      if (response.ok) {
        const createdPin = await response.json();
        onPinCreated(createdPin);  // Callback to parent to refresh the list
      } else {
        alert('Failed to create pin');
      }
    } catch (error) {
      console.error('Error creating pin:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Pin</button>
    </form>
  );
};

export default PinForm;
