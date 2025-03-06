import React, { useState, useEffect } from 'react';

const EditBoardForm = ({ boardId, onUpdate, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchBoard = async () => {
      const response = await fetch(`/api/boards/${boardId}`);
      const data = await response.json();
      setName(data.name);
      setDescription(data.description);
    };

    fetchBoard();
  }, [boardId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBoard = { name, description };

    try {
      const response = await fetch(`/api/boards/${boardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedBoard),
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate(data);
      } else {
        console.error('Failed to update board');
      }
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Board Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Board Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Update Board</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditBoardForm;
