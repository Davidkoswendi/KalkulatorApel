import React from 'react';
import { FaAppleAlt, FaCheck, FaTimes } from 'react-icons/fa';

const AnswerFeedback = ({ isCorrect }) => {
  const apples = isCorrect
    ? Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 2 + Math.random() * 1.5,
        size: 1.2 + Math.random() * 0.4
      }))
    : [];

  return (
    <div className="answer-feedback">
      <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
        {isCorrect ? (
          <>
            <FaCheck /> Yeay! Benar!
          </>
        ) : (
          <>
            <FaTimes /> Ups, Salah!
          </>
        )}
      </div>

      {/* Only render apples when correct */}
      {isCorrect && apples.map((apple) => (
        <FaAppleAlt
          key={apple.id}
          className="falling-apple"
          style={{
            left: `${apple.left}%`,
            fontSize: `${apple.size}rem`,
            animation: `smoothAppleFall ${apple.duration}s ${apple.delay}s forwards`
          }}
        />
      ))}
    </div>
  );
};

export default AnswerFeedback;
