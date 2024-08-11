import React, { useState } from 'react';
import './Flashcard.css'; // Import the custom CSS

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
    <div className="flashcard-container">
      <div className="flashcard" onClick={flipCard}>
        {flipped ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
      </div>
      <div className="button-group">
        <button onClick={prevCard} className="flashcard-btn">Previous</button>
        <button onClick={nextCard} className="flashcard-btn">Next</button>
      </div>
    </div>
  );
};

export default Flashcard;
