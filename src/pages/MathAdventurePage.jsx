// FILE: src/pages/MathAdventurePage.js
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  FaTrophy,
  FaBook,
  FaPencilAlt,
  FaGamepad,
  FaSignOutAlt,
} from 'react-icons/fa';
import '../styles/mathAdventurePage.css';

const MathAdventurePage = ({ username, onLogout }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('adventure');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle perubahan tab berdasarkan URL path
// Aktifkan tab berdasarkan lokasi saat URL berubah
useEffect(() => {
  const lastPath = location.pathname.split("/").pop();
  if (["adventure", "quiz", "story", "notes", "leaderboard"].includes(lastPath)) {
    setActiveTab(lastPath);
  }
}, [location.pathname]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="math-adventure-page">
      {/* Sidebar Desktop */}
      {!isMobile && (
        <nav className="sidebar">
          <div className="logo">🍎</div>
          <Link to="adventure" className={`round-icon ${activeTab === 'adventure' ? 'active' : ''}`}>
            <FaGamepad className="icon" />
          </Link>
          <Link to="quiz" className={`round-icon ${activeTab === 'quiz' ? 'active' : ''}`}>
            <FaPencilAlt className="icon" />
          </Link>
          <Link to="story" className={`round-icon ${activeTab === 'story' ? 'active' : ''}`}>
            <FaBook className="icon" />
          </Link>
          <Link to="notes" className={`round-icon ${activeTab === 'notes' ? 'active' : ''}`}>
            <FaBook className="icon" />
          </Link>
          <Link to="leaderboard" className={`round-icon ${activeTab === 'leaderboard' ? 'active' : ''}`}>
            <FaTrophy className="icon" />
          </Link>
        </nav>
      )}

      {/* Konten utama */}
      {!isMobile && (
        <main className="adventure-main">
          <header className="adventure-header">
            <h1>Petualangan Matematika</h1>
            <div className="user-container">
              <span className="username">Halo, {username}!</span>
              <button className="logout-button" onClick={onLogout}>
                <FaSignOutAlt className="icon" />
              </button>
            </div>
          </header>
          <div className="adventure-content">
            <Outlet />
          </div>
        </main>
      )}

      {/* Mode Mobile */}
      {isMobile && (
        <div className="mobile-container">
          <header className="mobile-header">
            <h1>🍎 Petualangan Matematika</h1>
            <div className="mobile-user-container">
              <span className="mobile-username">{username}</span>
              <button className="mobile-logout-button" onClick={onLogout}>
                <FaSignOutAlt className="icon" />
              </button>
            </div>
          </header>

          <div className="mobile-content">
            <Outlet />
          </div>

          <nav className="mobile-navbar">
            <Link to="adventure" className={`mobile-icon ${activeTab === 'adventure' ? 'active' : ''}`}>
              <FaGamepad className="icon" />
              <span>Petualangan</span>
            </Link>
            <Link to="quiz" className={`mobile-icon ${activeTab === 'quiz' ? 'active' : ''}`}>
              <FaPencilAlt className="icon" />
              <span>Soal PG</span>
            </Link>
            <Link to="story" className={`mobile-icon ${activeTab === 'story' ? 'active' : ''}`}>
              <FaBook className="icon" />
              <span>Soal Cerita</span>
            </Link>
            <Link to="notes" className={`mobile-icon ${activeTab === 'notes' ? 'active' : ''}`}>
              <FaBook className="icon" />
              <span>Catatan</span>
            </Link>
            <Link to="leaderboard" className={`mobile-icon ${activeTab === 'leaderboard' ? 'active' : ''}`}>
              <FaTrophy className="icon" />
              <span>Leaderboard</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MathAdventurePage;
