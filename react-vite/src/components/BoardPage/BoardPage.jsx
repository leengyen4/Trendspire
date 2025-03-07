import React, { useState, useEffect } from 'react';
import CreateBoardForm from './CreateBoardForm';
import EditBoardForm from './EditBoardForm';
import './BoardPage.css';

const BoardPage = () => {
  const [boards, setBoards] = useState([]);
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [availablePins, setAvailablePins] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('/api/boards');
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

    fetchBoards();
  }, []);

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
              <h2>{board.title}</h2> {/* Changed name to title */}
              <p>{board.description}</p>
              <button onClick={() => setEditingBoardId(board.id)}>Edit</button>
              <button onClick={() => handleDeleteBoard(board.id)}>Delete</button>
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
          onCancel={() => setEditingBoardId(null)}
        />
      ) : (
        <CreateBoardForm onCreate={handleNewBoard} />
      )}
    </div>
  );
};

export default BoardPage;
