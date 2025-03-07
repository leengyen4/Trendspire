import React, { useState } from 'react';

const CreateBoardForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const boardData = { title, description };

    try {
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(boardData),
      });

      if (response.ok) {
        const newBoard = await response.json();
        onCreate(newBoard);
        setTitle('');
        setDescription('');
      } else {
        console.error('Failed to create board');
      }
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Board Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Board Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Create Board</button>
    </form>
  );
};

export default CreateBoardForm;
