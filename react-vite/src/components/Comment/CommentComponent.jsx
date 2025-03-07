// src/components/Comment/CommentComponent.jsx
import React, { useState, useEffect } from 'react';
import CreateCommentForm from './CreateCommentForm';
import CommentItem from './CommentItem';
import './Comment.css';  // Optional: For custom styling

const CommentComponent = ({ pinId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state to track fetch process
  const [error, setError] = useState(null);  // State for errors

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch comments for the specific pin
    fetch(`/api/comments/${pinId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError('Failed to load comments. Please try again later.');
        setLoading(false);  // Set loading to false even in case of error
        console.error('Error fetching comments:', err);
      });
  }, [pinId]);

  const handleCommentCreated = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleCommentDeleted = (id) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
  };

  const handleCommentUpdated = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment))
    );
  };

  return (
    <div className="comment-component">
      {loading && <p>Loading comments...</p>}  {/* Display loading message */}
      {error && <p className="error">{error}</p>}  {/* Display error message */}

      <CreateCommentForm pinId={pinId} onCommentCreated={handleCommentCreated} />

      <div className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onCommentDeleted={handleCommentDeleted}
              onCommentUpdated={handleCommentUpdated}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;
