import React, { useEffect, useState } from 'react';
import './Homepage.css';  // Import CSS for Homepage

const Homepage = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('/api/boards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`  // Assuming you use token-based auth
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

    fetchBoards();
  }, []);

  return (
    <div>
      <h1>Your Boards</h1>
      <div className="board-container">
        {boards.length > 0 ? (
          boards.map((board) => (
            <div className="board-card" key={board.id}>
              <h2>{board.name}</h2>
              <p>{board.description}</p>
            </div>
          ))
        ) : (
          <p>No boards available.</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;