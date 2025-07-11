/**
 * FILE: src/components/DemoPage.js
 * HALAMAN DEMO PEMBELAJARAN
 * Fitur:
 * - Video tutorial penggunaan aplikasi
 * - Langkah-langkah pembelajaran interaktif
 * - Navigasi ke halaman kalkulator
 * - Visualisasi konsep matematika dengan apel
 * - Desain ramah anak dengan elemen interaktif
 * Dependencies:
 * - react-router-dom untuk navigasi
 * - react-icons untuk ikon
 * - CSS kustom untuk styling
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaCalculator } from 'react-icons/fa';
import '../styles.css';

const DemoPage = () => {
  const navigate = useNavigate();
  
  const demoVideo = "https://www.youtube.com/embed/VIDEO_ID"; // Replace VIDEO_ID

  const handlePlayClick = () => {
    navigate('/kalkulator');
  };

  return (
    <div className="app-container demo-page">
      {/* Header dengan tombol kembali */}
      <div className="header-with-home">
        <div className="header-content">
          <Link 
            to="/" 
            className="home-btn"
            state={{ from: 'demo' }}
          >
            <FaHome className="home-icon" />
            <span className="home-text">Kembali</span>
          </Link>
          <h1 className="demo-title">Demo Menyenangkan</h1>
        </div>
      </div>

      {/* Konten utama demo */}
      <div className="demo-container">
        {/* Intro demo */}
        <div className="demo-intro">
          <h2>Mari Belajar Bersama!</h2>
          <p className="fun-text">
            Lihat bagaimana si Apel membantu kita belajar matematika dengan cara yang seru!
          </p>
        </div>
        
        {/* Pemutar video */}
        <div className="video-container">
          <div className="video-wrapper">
            <iframe
              src={demoVideo}
              title="Demo Kalkulator Apel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="demo-video"
            ></iframe>
          </div>
          <div className="video-controls">
            <button 
              className="play-button"
              onClick={handlePlayClick}
            >
              <FaCalculator /> Coba Kalkulator
            </button>
          </div>
        </div>

        {/* Langkah-langkah pembelajaran */}
        <div className="fun-steps">
          <h3 className="steps-title">Cara Menggunakan:</h3>
          <div className="steps-container">
            {/* Kartu langkah 1 */}
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Penjumlahan Apel</h4>
                <p>5 + 3 = 8</p>
                <div className="apple-visual">🍎🍎🍎🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎🍎🍎🍎</div>
              </div>
            </div>

            {/* Kartu langkah 2 */}
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Pengurangan Apel</h4>
                <p>6 - 2 = 4</p>
                <div className="apple-visual">🍎🍎🍎🍎🍎🍎 - 🍎🍎 = 🍎🍎🍎🍎</div>
              </div>
            </div>

            {/* Kartu langkah 3 */}
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Perkalian Apel</h4>
                <p>4 × 3 = 12</p>
                <div className="apple-visual">4 kelompok × 🍎🍎🍎 = 🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎</div>
              </div>
            </div>

            {/* Kartu langkah 4 */}
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Pembagian Apel</h4>
                <p>8 ÷ 2 = 4</p>
                <div className="apple-visual">🍎🍎🍎🍎🍎🍎🍎🍎 dibagi 2 = 🍎🍎🍎🍎 dan 🍎🍎🍎🍎</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;