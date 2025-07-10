import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaAppleAlt, FaCalculator, FaVideo, FaGamepad } from 'react-icons/fa';
import '../styles/home.css';

const HomePage = ({ setIsPlaying, setCurrentTrack }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const location = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);

  const handleStart = () => {
    setCurrentTrack();
    setShowLoading(true);
    setIsPlaying(true);
    setTimeout(() => {
      setShowWelcome(false);
      setShowLoading(false);
      setInitialLoad(false);
    }, 2500);
  };

  useEffect(() => {
    if (location.state?.from) {
      setShowWelcome(false);
      setShowLoading(true);
      const timer = setTimeout(() => setShowLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="home-container">
      {/* Welcome Screen */}
      {initialLoad && showWelcome && !showLoading && (
        <div className="welcome-overlay">
          <div className="welcome-message">
            <div className="welcome-apple">
              <FaAppleAlt />
            </div>
            <h1>Selamat Datang!</h1>
            <p>Belajar Matematika dengan Cara Menyenangkan</p>
            <button className="start-button" onClick={handleStart}>
              Mulai Belajar
            </button>
          </div>
        </div>
      )}

      {/* Loading Screen */}
      {showLoading && (
        <div className="welcome-overlay">
          <div className="loading-screen">
            <div className="apple-loading">
              <FaAppleAlt />
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
            </div>
            <p>Loading harap tunggu...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!showWelcome && !showLoading && (
        <>
          <header className="hero-section">
            <div className="hero-content">
              <h1>
                <FaAppleAlt className="title-apple" /> 
                Kalkulator Apel
              </h1>
              <p>Tingkatkan kemampuan matematika dengan permainan interaktif dan belajar dengan kalkulator Apel</p>
              <div className="cta-buttons">
                <Link to="/kalkulator" className="btn-primary" state={{ from: 'home' }}>
                  <FaCalculator /> Gunakan Kalkulator
                </Link>
                <Link to="/demo" className="btn-secondary" state={{ from: 'home' }}>
                  <FaVideo /> Lihat Demo
                </Link>
                <Link to="/math-adventure" className="btn-adventure">
                  <FaGamepad /> Petualangan Matematika
                </Link>
              </div>
            </div>
          </header>

          <section className="features-section">
            <h2 className="features-title">Fitur Kami</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🍎</div>
                <h3>Kalkulator Apel</h3>
                <p>Belajar asik dengan Kalkulator apel yang melatih perhitungan,
                   dan pembacaan angka dengan fisual apel yang memudahkan anak belajar berhitung</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎮</div>
                <h3>Game Edukasi</h3>
                <p>Belajar matematika melalui petualangan seru dengan level yang menantang</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Tingkat Kesulitan</h3>
                <p>10 level dengan soal yang semakin sulit untuk mengasah kemampuanmu</p>
              </div>
            </div>
          </section>

          <footer className="home-footer">
            <div className="footer-apples">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`footer-apple apple-${i}`}>
                  <FaAppleAlt />
                </div>
              ))}
            </div>
            <p>2025 Kebun Matematika - Belajar sambil bermain</p>
            <p>Dibuat dengan ❤ untuk anak-anak Indonesia</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default HomePage;