import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Comment.css';  // Import your styles

const CommentComponent = () => {
  const { pinId } = useParams(); // Get the pin ID from the URL
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch comments associated with the pin
  useEffect(() => {
    setLoading(true);
    fetch(`/api/comments/${pinId}`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [pinId]);

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() === '') return;  // Prevent adding empty comments

    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newComment, pin_id: pinId }),
    })
      .then(res => res.json())
      .then(data => {
        setComments([...comments, data]);
        setNewComment('');  // Reset the input
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Handle editing a comment
  const handleEditComment = (id) => {
    setEditingCommentId(id);
    const comment = comments.find(comment => comment.id === id);
    setEditingContent(comment.content);
  };

  const handleSaveEditedComment = (id) => {
    fetch(`/api/comments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: editingContent }),
    })
      .then(res => res.json())
      .then(data => {
        setComments(comments.map(comment => (comment.id === id ? data : comment)));
        setEditingCommentId(null);
        setEditingContent('');
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Handle deleting a comment
  const handleDeleteComment = (id) => {
    fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setComments(comments.filter(comment => comment.id !== id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="comment-container">
      <h3>Comments</h3>

      {/* Add New Comment */}
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>

      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            {/* Edit Comment */}
            {editingCommentId === comment.id ? (
              <>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <button onClick={() => handleSaveEditedComment(comment.id)}>Save</button>
                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{comment.content}</p>
                <button onClick={() => handleEditComment(comment.id)}>Edit</button>
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentComponent;
