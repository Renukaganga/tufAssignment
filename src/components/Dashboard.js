import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'
const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });
  const [role, setRole] = useState(''); 

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  useEffect(() => {
    const fetchFlashcards = async () => {
      const response = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(response.data);
    };
    fetchFlashcards();
  }, []);

  const addFlashcard = async () => {
    const response = await axios.post('http://localhost:5000/api/flashcards', newCard);
    setFlashcards([...flashcards, response.data]);
    setNewCard({ question: '', answer: '' });
  };

  const deleteFlashcard = async (id) => {
    await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
    setFlashcards(flashcards.filter((card) => card._id !== id));
  };

  return (
    <div className="dashboard-container">
      <h1 className="text-center mb-4">Flashcard Dashboard</h1>

      <div className="mb-4">
        <label className="form-label">Select Role:</label>
        <select
          value={role}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select...</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {role === 'admin' && (
        <div className="mb-4">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Question"
              value={newCard.question}
              onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder="Answer"
              value={newCard.answer}
              onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
              className="form-control mb-2"
            />
            <button
              onClick={addFlashcard}
              className="btn btn-primary w-100"
            >
              Add Flashcard
            </button>
          </div>

          <ul className="list-unstyled">
            {flashcards.map((card) => (
              <li key={card._id} className="flashcard-item mb-3">
                <span className="flashcard-text">{card.question} - {card.answer}</span>
                <button
                  onClick={() => deleteFlashcard(card._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
