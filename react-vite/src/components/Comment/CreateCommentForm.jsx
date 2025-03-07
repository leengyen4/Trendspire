// src/components/Comment/CreateCommentForm.jsx
import React, { useState } from 'react';

const CreateCommentForm = ({ pinId, onCommentCreated }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = { content, pin_id: pinId };

    try {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const createdComment = await response.json();
        onCommentCreated(createdComment); // Update the parent with the new comment
        setContent(''); // Clear the form
      } else {
        alert('You must be logged in to create a comment.');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Error creating comment. Please try again.');
    }
  };

  return (
    <form className="create-comment-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CreateCommentForm;
