/**
 * FILE: src/pages/StoryPage.js
 * HALAMAN SOAL CERITA MATEMATIKA
 */

import React from 'react';
import { FaBook, FaPencilAlt } from 'react-icons/fa';
import '../styles/storyPage.css';

const StoryPage = () => {
  // Contoh data soal cerita
  const storyProblems = [
    {
      id: 1,
      problem: "Ibu membeli 15 apel. Dia memberikan 3 apel kepada tetangga dan 5 apel kepada anaknya. Berapa apel yang tersisa?",
      answer: 7,
    },
    {
      id: 2,
      problem: "Sebuah kebun memiliki 24 pohon apel. Jika setiap pohon menghasilkan 12 apel, berapa total apel yang dihasilkan?",
      answer: 288,
    },
  ];

  return (
    <div className="story-page">
      <h2><FaBook /> Soal Cerita Matematika</h2>
      <div className="problems-container">
        {storyProblems.map((problem) => (
          <div key={problem.id} className="problem-card">
            <div className="problem-text">
              <FaPencilAlt className="problem-icon" />
              <p>{problem.problem}</p>
            </div>
            <button 
              className="show-answer-btn"
              onClick={() => alert(`Jawaban: ${problem.answer}`)}
            >
              Tampilkan Jawaban
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryPage;