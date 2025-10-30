/**
 * FILE: src/pages/HomePage.js
 * HALAMAN UTAMA APLIKASI
 * - Tampilan awal/welcome screen
 * - Navigasi ke fitur lain
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaAppleAlt, FaCalculator, FaVideo, FaGamepad, FaHome } from 'react-icons/fa';
import '../styles/home.css';

const HomePage = ({ setIsPlaying, setCurrentTrack }) => {
  // State untuk kontrol tampilan
  const [showWelcome, setShowWelcome] = useState(true); // Tampilkan layar selamat datang
  const [showLoading, setShowLoading] = useState(false); // Tampilkan loading screen
  const location = useLocation(); // Untuk tracking rute
  const [initialLoad, setInitialLoad] = useState(true); // Status load pertama kali

 
  // Handle tombol mulai
  const handleStart = () => {
    setCurrentTrack(); // Set musik default
    setShowLoading(true); // Tampilkan loading
    setIsPlaying(true); // Mainkan musik
    
    // Set timeout untuk simulasi loading
    setTimeout(() => {
      setShowWelcome(false);
      setShowLoading(false);
      setInitialLoad(false);
    }, 2500);
  };

  // Effect untuk handle navigasi dari halaman lain
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
      {/* Welcome Screen (hanya tampil saat pertama kali) */}
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

      {/* Main Content (setelah loading selesai) */}
      {!showWelcome && !showLoading && (
        <>
          {/* Hero Section */}
          <header className="hero-section">
            <div className="hero-content">
              <h1>
                <FaAppleAlt className="title-apple" /> 
                Kalkulator Apel
              </h1>
              <p>Tingkatkan kemampuan matematika dengan permainan interaktif</p>
              
              {/* Tombol navigasi utama */}
              <div className="cta-buttons">
                <Link to="/kalkulator" className="btn-primary" state={{ from: 'home' }}>
                  <FaCalculator /> Gunakan Kalkulator
                </Link>
                <Link to="/demo" className="btn-secondary" state={{ from: 'home' }}>
                  <FaVideo /> Lihat Demo
                </Link>
<Link 
  to="/login" 
  className="btn-adventure"
  state={{ from: 'math-adventure' }}
>
  <FaGamepad /> Petualangan Matematika
</Link>
              </div>
            </div>
          </header>

          {/* Fitur-fitur aplikasi */}
          <section className="features-section">
            <h2 className="features-title">Fitur Kami</h2>
            <div className="features-grid">
              {/* Card fitur 1 */}
              <div className="feature-card">
                <div className="feature-icon">🍎</div>
                <h3>Kalkulator Apel</h3>
                <p>Belajar berhitung dengan visual apel yang interaktif</p>
              </div>
              
              {/* Card fitur 2 */}
              <div className="feature-card">
                <div className="feature-icon">🎮</div>
                <h3>Game Edukasi</h3>
                <p>Petualangan matematika dengan level menantang</p>
              </div>
              
              {/* Card fitur 3 */}
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Tingkat Kesulitan</h3>
                <p>10 level dengan soal yang semakin sulit</p>
              </div>
            </div>
          </section>

          {/* Footer */}
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