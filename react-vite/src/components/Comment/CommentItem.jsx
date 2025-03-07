// src/components/Comment/CommentItem.jsx
import React, { useState } from 'react';

const CommentItem = ({ comment, onCommentDeleted, onCommentUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);

  const handleDelete = async () => {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      onCommentDeleted(comment.id); // Remove the comment from the parent list
    } else {
      alert('Failed to delete the comment');
    }
  };

  const handleUpdate = async () => {
    const updatedComment = { content: updatedContent };

    const response = await fetch(`/api/comments/${comment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedComment),
    });

    if (response.ok) {
      const data = await response.json();
      onCommentUpdated(data); // Update the comment in the parent list
      setIsEditing(false); // Close the edit form
    } else {
      alert('Failed to update the comment');
    }
  };

  return (
    <div className="comment-item">
      {isEditing ? (
        <div>
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <p>{comment.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default CommentItem;
