import React, { useState, useEffect } from 'react';
import CreateBoardForm from './CreateBoardForm';
import EditBoardForm from './EditBoardForm';
import './BoardPage.css';

const BoardPage = () => {
  const [boards, setBoards] = useState([]);
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [availablePins, setAvailablePins] = useState([]); // New state to store available pins

  // Fetch boards and pins when component mounts
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('/api/boards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBoards(data);
        } else {
          console.error('Failed to fetch boards');
        }
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    const fetchPins = async () => {
      try {
        const response = await fetch('/api/pins', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAvailablePins(data);
        } else {
          console.error('Failed to fetch pins');
        }
      } catch (error) {
        console.error('Error fetching pins:', error);
      }
    };

    fetchBoards();
    fetchPins();
  }, []);

  // Handle new board creation
  const handleNewBoard = (newBoard) => {
    setBoards((prevBoards) => [...prevBoards, newBoard]);
  };

  // Handle board update
  const handleUpdateBoard = (updatedBoard) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === updatedBoard.id ? updatedBoard : board
      )
    );
    setEditingBoardId(null); // Close the edit form
  };

  // Handle board deletion
  const handleDeleteBoard = async (id) => {
    try {
      const response = await fetch(`/api/boards/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
      } else {
        console.error('Failed to delete board');
      }
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  // Handle editing a board
  const handleEditBoard = (boardId) => {
    setEditingBoardId(boardId);
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditingBoardId(null);
  };

  // Add pin to board
  const handleAddPinToBoard = async (boardId, pinId) => {
    try {
      const response = await fetch(`/api/boardpins/${boardId}/pins/${pinId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // You can update the board's pin list here
        console.log('Pin added:', data);
      } else {
        console.error('Failed to add pin');
      }
    } catch (error) {
      console.error('Error adding pin:', error);
    }
  };

  return (
    <div>
      <h1>Your Boards</h1>
      <div className="board-container">
        {boards.length > 0 ? (
          boards.map((board) => (
            <div className="board-card" key={board.id}>
              <h2>{board.name}</h2>
              <p>{board.description}</p>
              <button onClick={() => handleEditBoard(board.id)}>Edit</button>
              <button onClick={() => handleDeleteBoard(board.id)}>Delete</button>
              <div>
                <h3>Add a Pin</h3>
                {availablePins.length > 0 ? (
                  <select
                    onChange={(e) =>
                      handleAddPinToBoard(board.id, e.target.value)
                    }
                  >
                    <option value="">Select a pin</option>
                    {availablePins.map((pin) => (
                      <option key={pin.id} value={pin.id}>
                        {pin.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>No available pins.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No boards available.</p>
        )}
      </div>

      {editingBoardId ? (
        <EditBoardForm
          boardId={editingBoardId}
          onUpdate={handleUpdateBoard}
          onCancel={handleCancelEdit}
        />
      ) : (
        <CreateBoardForm onCreate={handleNewBoard} />
      )}
    </div>
  );
};

export default BoardPage;
