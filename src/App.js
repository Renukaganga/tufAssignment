// src/App.js
import React, { useEffect, useState } from 'react';
import Flashcard from './components/FlashCard';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import './index.css'

const App = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const response = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(response.data);
    };
    fetchFlashcards();
  }, []);

  return (
    <div>
      <h1>Flashcard Learning Tool</h1>
      <div>
        <Dashboard />
      </div>
      {flashcards.length > 0 ? <Flashcard flashcards={flashcards} /> : <p>Loading...</p>}
    </div>
  );
};

export default App;
