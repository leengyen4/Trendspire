import React, { useState } from 'react';
import CommentComponent from '../Comment/CommentComponent'; // Import CommentComponent

const PinItem = ({ pin, onPinDeleted, onPinUpdated, onFavoriteToggle, favorites, onAddToBoard, boards }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(pin.title);
  const [updatedDescription, setUpdatedDescription] = useState(pin.description);
  const [updatedImageUrl, setUpdatedImageUrl] = useState(pin.image_url);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false); // For toggling the board modal

  // Toggle Add to Board Modal
  const toggleBoardModal = () => {
    setIsBoardModalOpen(!isBoardModalOpen);
  };

  // Handle adding pin to a board
  const handleAddToBoard = (boardId) => {
    onAddToBoard(pin.id, boardId); // Trigger the add action in the parent component
    setIsBoardModalOpen(false); // Close the modal after adding
  };

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

  // Check if the pin is favorited
  const isFavorited = favorites.some(fav => fav.pin_id === pin.id);

  return (
    <div className="pin-item">
      {/* Favorite/Unfavorite button */}
      <button 
        onClick={() => onFavoriteToggle(pin.id)}
        className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
      >
        {isFavorited ? 'Unfavorite' : 'Favorite'}
      </button>

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

          {/* Edit button */}
          <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>

          {/* Delete button */}
          <button onClick={handleDelete} className="delete-btn">Delete</button>

          {/* Add to Board button */}
          <button onClick={toggleBoardModal} className="favorite-btn">
            Add to Board
          </button>

          {/* Modal to select board */}
          {isBoardModalOpen && (
            <div className="board-modal-overlay" onClick={toggleBoardModal}>
              <div className="board-modal" onClick={(e) => e.stopPropagation()}>
                <h4>Select a Board</h4>
                <ul>
                  {boards && boards.length > 0 ? (
                    boards.map((board) => (
                      <li key={board.id}>
                        <button onClick={() => handleAddToBoard(board.id)}>
                          {board.title}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li>No boards available</li>
                  )}
                </ul>
                <button onClick={() => setIsBoardModalOpen(false)}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}

      <CommentComponent pinId={pin.id} />
    </div>
  );
};

export default PinItem;
