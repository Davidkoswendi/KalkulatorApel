import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaPlay, FaCalculator } from 'react-icons/fa';
import '../styles.css';

const DemoPage = () => {
  const navigate = useNavigate();
  
  const demoVideo = "https://www.youtube.com/embed/VIDEO_ID"; // Replace VIDEO_ID

  const handlePlayClick = () => {
    navigate('/kalkulator');
  };

  return (
 <div className="app-container demo-page">
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

      <div className="demo-container">
        <div className="demo-intro">
          <h2>Mari Belajar Bersama!</h2>
          <p className="fun-text">
            Lihat bagaimana si Apel membantu kita belajar matematika dengan cara yang seru!
          </p>
        </div>
        
        {/* Video Player with Playful Design */}
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

        {/* Fun Learning Steps */}
        <div className="fun-steps">
          <h3 className="steps-title">Cara Menggunakan:</h3>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Penjumlahan Apel</h4>
                <p>5 + 3 = 8</p>
                <div className="apple-visual">🍎🍎🍎🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎🍎🍎🍎</div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Pengurangan Apel</h4>
                <p>6 - 2 = 4</p>
                <div className="apple-visual">🍎🍎🍎🍎🍎🍎 - 🍎🍎 = 🍎🍎🍎🍎</div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Perkalian Apel</h4>
                <p>4 × 3 = 12</p>
                <div className="apple-visual">4 kelompok × 🍎🍎🍎 = 🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎</div>
              </div>
            </div>

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