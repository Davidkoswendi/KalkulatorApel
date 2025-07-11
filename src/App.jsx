/**
 * FILE: src/App.js
 * FILE UTAMA APLIKASI
 * - Mengatur semua routing aplikasi
 * - Mengontrol state musik global
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Import komponen halaman
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import DemoPage from "./pages/DemoPage";
import MusicPlayer from "./components/MusicPlayer";
import MathAdventure from './components/MathAdventure';

// Import file musik
import musicTrack from './assets/sounds/music.mp3'; // Musik utama
import adventureTrack from './assets/sounds/adventure-music.mp3'; // Musik game

// Import CSS
import "bootstrap/dist/css/bootstrap.min.css"; // CSS Bootstrap
import "./styles.css"; // CSS custom

/**
 * Komponen AppWrapper - Layout utama aplikasi
 */
const AppWrapper = () => {
  // Mengambil lokasi/rute saat ini
  const location = useLocation();
  
  // State untuk kontrol musik:
  const [isPlaying, setIsPlaying] = useState(false); // Status play/pause
  const [currentTrack, setCurrentTrack] = useState(musicTrack); // Track yang aktif

  // Effect untuk ganti musik otomatis berdasarkan rute
  useEffect(() => {
    // Jika tidak di halaman petualangan, set musik default
    if (!location.pathname.includes('math-adventure')) {
      setCurrentTrack(musicTrack);
    }
  }, [location]);

  // Fungsi untuk reset musik ke default
  const resetMusic = () => {
    setCurrentTrack(musicTrack); // Set ke track utama
    setIsPlaying(true); // Auto play
  };

  return (
    <>
      {/* Komponen pemutar musik */}
      <MusicPlayer 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentTrack={currentTrack}
      />
      
      {/* Sistem routing aplikasi */}
      <Routes>
        {/* Halaman utama */}
        <Route path="/" element={
          <HomePage 
            setIsPlaying={setIsPlaying} 
            setCurrentTrack={() => setCurrentTrack(musicTrack)}
          />
        } />
        
        {/* Halaman game matematika */}
        <Route path="/math-adventure" element={
          <MathAdventure 
            setCurrentTrack={() => setCurrentTrack(adventureTrack)}
            resetMusic={resetMusic}
          />
        } />
        
        {/* Halaman kalkulator */}
        <Route path="/kalkulator" element={<CalculatorPage />} />
        
        {/* Halaman demo/tutorial */}
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </>
  );
};

/**
 * Komponen App utama yang membungkus dengan Router
 */
const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;

/**
 * Fungsi utilitas untuk memainkan efek suara
 * @param {string} url - Path/lokasi file suara
 */
export const playSound = (url) => {
  const audio = new Audio(url); // Buat objek audio
  audio.volume = 0.6; // Set volume menjadi 60%
  audio.play().catch((err) => console.warn("Gagal memutar suara:", err));
};