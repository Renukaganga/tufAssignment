import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Flashcard Dashboard</h1>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Select Role:</label>
        <select
          value={role}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select...</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {role === 'admin' && (
        <div className="mb-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Question"
              value={newCard.question}
              onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Answer"
              value={newCard.answer}
              onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addFlashcard}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Add Flashcard
            </button>
          </div>

          <ul className="space-y-4">
            {flashcards.map((card) => (
              <li key={card._id} className="p-4 bg-gray-100 rounded-md shadow-md flex justify-between items-center">
                <span className="text-lg font-medium">{card.question} - {card.answer}</span>
                <button
                  onClick={() => deleteFlashcard(card._id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
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
