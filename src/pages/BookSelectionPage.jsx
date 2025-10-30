// src/pages/BookSelectionPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/bookSelection.css';

const BookSelectionPage = () => {
  const navigate = useNavigate();

// Sudah benar ✅
const books = [
  {
    title: "📘 Perkalian",
    route: "/math-adventure/notes/perkalian", // ✅ nested path
    color: "#74b9ff",
    description: "Belajar tabel perkalian dari 1 sampai 15"
  },
  {
    title: "📕 Pembagian",
    route: "/math-adventure/notes/pembagian",
    color: "#fab1a0",
    description: "Latihan pembagian secara menyenangkan"
  },
  {
    title: "📗 Pangkat 2",
    route: "/math-adventure/notes/pangkat",
    color: "#55efc4",
    description: "Kenali dan pahami kuadrat angka 1 - 30"
  },
];


  return (
    <div className="book-selection">
      <h1 className="book-selection-title">📚 Pilih Buku Matematika</h1>
      <div className="book-grid">
        {books.map((book, i) => (
          <div
            key={i}
            className="book-card"
            style={{ backgroundColor: book.color }}
            onClick={() => navigate(book.route)}
          >
            <h2>{book.title}</h2>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSelectionPage;
