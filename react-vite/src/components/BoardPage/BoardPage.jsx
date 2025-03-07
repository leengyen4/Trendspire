import React, { useState, useEffect } from 'react';
import CreateBoardForm from './CreateBoardForm';
import EditBoardForm from './EditBoardForm';
import './BoardPage.css';

const BoardPage = () => {
  const [boards, setBoards] = useState([]);
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [pinsForBoard, setPinsForBoard] = useState({}); // To store pins by board id

  // Fetch boards and pins for each board
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('/api/boards');
        if (response.ok) {
          const data = await response.json();
          setBoards(data);
          // Fetch pins for each board after fetching boards
          data.forEach(board => {
            fetchPinsForBoard(board.id);
          });
        } else {
          console.error('Failed to fetch boards');
        }
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    // Fetch pins for a specific board
    const fetchPinsForBoard = async (boardId) => {
      try {
        const response = await fetch(`/api/boardpins/${boardId}/pins`);
        if (response.ok) {
          const pinsData = await response.json();
          setPinsForBoard(prevState => ({
            ...prevState,
            [boardId]: pinsData,  // Store pins for the specific board
          }));
        } else {
          console.error('Failed to fetch pins for board', boardId);
        }
      } catch (error) {
        console.error('Error fetching pins for board:', error);
      }
    };

    fetchBoards();
  }, []);

  const handleAddToBoard = async (pinId, boardId) => {
    try {
      const response = await fetch(`/api/boardpins/${boardId}/pins/${pinId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Fetch the updated pins for the board after adding the pin
        const pinsResponse = await fetch(`/api/boardpins/${boardId}/pins`);
        if (pinsResponse.ok) {
          const pinsData = await pinsResponse.json();
          setPinsForBoard(prevState => ({
            ...prevState,
            [boardId]: pinsData,  // Update pins for the specific board
          }));
        }
        alert('Pin added to board successfully!');
      } else {
        console.error('Failed to add pin to board');
      }
    } catch (error) {
      console.error('Error adding pin to board:', error);
    }
  };

  const handleRemovePinFromBoard = async (boardId, pinId) => {
    try {
      const response = await fetch(`/api/boardpins/${boardId}/pins/${pinId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update state to reflect removed pin
        setPinsForBoard((prevState) => ({
          ...prevState,
          [boardId]: prevState[boardId].filter(pin => pin.pin_id !== pinId),
        }));
      } else {
        console.error('Failed to remove pin from board');
      }
    } catch (error) {
      console.error('Error removing pin from board:', error);
    }
  };

  const handleNewBoard = (newBoard) => {
    setBoards((prevBoards) => [...prevBoards, newBoard]);
  };

  const handleUpdateBoard = (updatedBoard) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === updatedBoard.id ? updatedBoard : board
      )
    );
    setEditingBoardId(null);
  };

  const handleDeleteBoard = async (id) => {
    try {
      const response = await fetch(`/api/boards/${id}`, {
        method: 'DELETE',
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

  return (
    <div>
      <h1>Your Boards</h1>
      <div className="board-container">
        {boards.length > 0 ? (
          boards.map((board) => (
            <div className="board-card" key={board.id}>
              <h2>{board.title}</h2>
              <p>{board.description}</p>

              {/* Display pins for this board */}
              <h3>Pins:</h3>
              <div className="board-pins">
                {pinsForBoard[board.id] && pinsForBoard[board.id].length > 0 ? (
                  pinsForBoard[board.id].map((pin) => (
                    <div key={pin.pin_id} className="board-pin">
                      <h4>{pin.pin_title}</h4>
                      <p>{pin.pin_description}</p>
                      <button
                        onClick={() => handleRemovePinFromBoard(board.id, pin.pin_id)}
                        className="remove-pin-btn"
                      >
                        Remove Pin
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No pins added to this board yet.</p>
                )}
              </div>

              {/* Edit and Delete buttons for the board */}
              <div className="buttons-container">
                <button onClick={() => setEditingBoardId(board.id)}>Edit</button>
                <button onClick={() => handleDeleteBoard(board.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No boards available.</p>
        )}
      </div>

      {/* Add space between the boards and the form */}
      <div className="create-board-form">
        {editingBoardId ? (
          <EditBoardForm
            boardId={editingBoardId}
            onUpdate={handleUpdateBoard}
            onCancel={() => setEditingBoardId(null)}
          />
        ) : (
          <CreateBoardForm onCreate={handleNewBoard} />
        )}
      </div>
    </div>
  );
};

export default BoardPage;
