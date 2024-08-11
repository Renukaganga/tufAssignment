// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

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
    <div>
      <h2>Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Question"
        value={newCard.question}
        onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
      />
      <input
        type="text"
        placeholder="Answer"
        value={newCard.answer}
        onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
      />
      <button onClick={addFlashcard}>Add Flashcard</button>
      <ul>
        {flashcards.map((card) => (
          <li key={card._id}>
            {card.question} - {card.answer}{' '}
            <button onClick={() => deleteFlashcard(card._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
