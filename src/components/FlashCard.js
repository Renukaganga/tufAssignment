// src/components/Flashcard.js
import React, { useState } from 'react';

const Flashcard = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  const flipCard = () => setFlipped(!flipped);

  return (
    <div>
      <div onClick={flipCard} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '20px', marginBottom: '10px' }}>
        {flipped ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
      </div>
      <button onClick={prevCard}>Previous</button>
      <button onClick={nextCard}>Next</button>
    </div>
  );
};

export default Flashcard;
