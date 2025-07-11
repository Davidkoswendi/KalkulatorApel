/**
 * FILE: src/components/AnswerFeedback.js
 * KOMPONEN FEEDBACK JAWABAN
 * Fitur:
 * - Menampilkan feedback visual untuk jawaban benar/salah
 * - Animasi apel jatuh yang dinamis hanya untuk jawaban benar
 * - Pesan dan ikon berbeda untuk jawaban benar/salah
 * - Properti animasi yang acak untuk variasi visual
 * - Desain responsif dan mudah dikustomisasi
 * 
 * Props:
 * @param {boolean} isCorrect - Status benar/salah jawaban pengguna
 * 
 * Dependencies:
 * - react-icons/fa untuk ikon FontAwesome
 * - CSS animations untuk efek jatuh apel
 */

import React from 'react';
import { FaAppleAlt, FaCheck, FaTimes } from 'react-icons/fa';

const AnswerFeedback = ({ isCorrect }) => {
  // Membuat data untuk animasi apel jatuh hanya jika jawaban benar
  const apples = isCorrect
    ? Array.from({ length: 10 }, (_, i) => ({
        id: i,                   // ID unik untuk setiap apel
        left: Math.random() * 100, // Posisi horizontal acak (0-100%)
        delay: Math.random() * 0.3, // Waktu tunda sebelum animasi dimulai (0-0.3 detik)
        duration: 2 + Math.random() * 1.5, // Durasi animasi (2-3.5 detik)
        size: 1.2 + Math.random() * 0.4 // Ukuran apel (1.2-1.6rem)
      }))
    : []; // Jika jawaban salah, array kosong

  return (
    <div className="answer-feedback">
      {/* Container untuk pesan feedback */}
      <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
        {isCorrect ? (
          <>
            {/* Tampilkan icon centang dan pesan jika benar */}
            <FaCheck /> Yeay! Benar!
          </>
        ) : (
          <>
            {/* Tampilkan icon silang dan pesan jika salah */}
            <FaTimes /> Ups, Salah!
          </>
        )}
      </div>

      {/* Render animasi apel hanya jika jawaban benar */}
      {isCorrect && apples.map((apple) => (
        <FaAppleAlt
          key={apple.id}  // Key unik untuk React
          className="falling-apple" // Class untuk styling
          style={{
            left: `${apple.left}%`, // Posisi horizontal
            fontSize: `${apple.size}rem`, // Ukuran apel
            // Animasi jatuh dengan durasi dan delay yang acak
            animation: `smoothAppleFall ${apple.duration}s ${apple.delay}s forwards`
          }}
        />
      ))}
    </div>
  );
};

export default AnswerFeedback;