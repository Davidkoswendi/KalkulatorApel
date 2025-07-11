/**
 * FILE: src/pages/CalculatorPage.js
 * HALAMAN KALKULATOR UTAMA
 * - Menangani semua logika perhitungan
 * - Menyimpan riwayat perhitungan
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaMusic, FaPlay, FaPause } from "react-icons/fa";

// Import komponen
import AppleDisplay from "../components/AppleDisplay";
import CalculatorControls from "../components/CalculatorControls";
import HistorySection from "../components/HistorySection";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

// Import CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const CalculatorPage = () => {
  // State untuk kalkulator
  const [num1, setNum1] = useState(null); // Angka pertama
  const [num2, setNum2] = useState(null); // Angka kedua
  const [operation, setOperation] = useState(null); // Operator (+, -, *, /)
  const [result, setResult] = useState(null); // Hasil perhitungan
  const [history, setHistory] = useState([]); // Riwayat perhitungan
  const [isPlaying, setIsPlaying] = useState(true); // Status musik

  /**
   * Fungsi untuk toggle play/pause musik
   */
  const toggleMusic = () => {
    const audio = document.getElementById("bg-music");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Load riwayat dari localStorage saat komponen dimount
  useEffect(() => {
    const saved = localStorage.getItem("calcHistory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistory(parsed);
        }
      } catch (e) {
        console.error("Error parsing history:", e);
      }
    }
  }, []);

  // Simpan riwayat ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("calcHistory", JSON.stringify(history));
  }, [history]);

  // Fungsi utama untuk melakukan perhitungan
  const calculate = (num1, num2, op) => {
    let calculatedResult;
    
    // Lakukan perhitungan berdasarkan operator
    switch (op) {
      case "+": 
        calculatedResult = num1 + num2; 
        break;
      case "-": 
        calculatedResult = num1 - num2; 
        break;
      case "*": 
        calculatedResult = num1 * num2; 
        break;
      case "/": 
        // Handle pembagian oleh nol
        calculatedResult = num2 !== 0 ? num1 / num2 : 0; 
        break;
      default: 
        calculatedResult = 0;
    }

    // Update state dengan hasil perhitungan
    setNum1(num1);
    setNum2(num2);
    setOperation(op);
    setResult(calculatedResult);

    // Tambahkan ke riwayat (maksimal 5 item)
    setHistory(prev => [
      { num1, num2, op, result: calculatedResult, id: Date.now() },
      ...prev.slice(0, 4)
    ]);
  };

  /**
   * Reset kalkulator ke keadaan awal
   */
  const resetCalculator = () => {
    setNum1(null);
    setNum2(null);
    setOperation(null);
    setResult(null);
  };

  /**
   * Gunakan item dari riwayat
   * @param {object} item - Item riwayat yang akan digunakan
   */
  const useHistoryItem = (item) => {
    setNum1(item.num1);
    setNum2(item.num2);
    setOperation(item.op);
    setResult(item.result);
  };

  /**
   * Hapus item dari riwayat
   *- ID item yang akan dihapus
   */
  const removeHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  /**
   * Hapus semua riwayat
   */
  const clearAllHistory = () => {
    setHistory([]);
  };

  return (
    <div className="app-container">
      {/* Elemen audio untuk musik latar */}
      <audio id="bg-music" loop autoPlay>
        <source src="/assets/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Header dengan tombol kembali */}
      <div className="header-with-home">
        <div className="header-content">
          <Link 
            to="/" 
            className="home-btn"
            state={{ from: 'calculator' }}
          >
            <FaHome className="home-icon" />
            <span className="home-text">Kembali</span>
          </Link>
          <AppHeader />
        </div>
      </div>
      
      {/* Konten utama kalkulator */}
      <main className="calculator-main">
        <div className="calculator-box">
          {/* Komponen tampilan apel */}
          <AppleDisplay 
            num1={num1} 
            num2={num2} 
            operation={operation} 
            result={result} 
          />
          
          {/* Komponen kontrol kalkulator */}
          <CalculatorControls 
            onCalculate={calculate} 
            onReset={resetCalculator} 
          />
        </div>

        {/* Komponen riwayat perhitungan */}
        <HistorySection 
          history={history}
          onUseItem={useHistoryItem}
          onRemoveItem={removeHistoryItem}
          onClearAll={clearAllHistory}
        />
      </main>
      
      {/* Footer aplikasi */}
      <AppFooter />
    </div>
  );
};

export default CalculatorPage;