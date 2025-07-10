import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaMusic, FaPlay, FaPause } from "react-icons/fa";
import AppleDisplay from "../components/AppleDisplay";
import CalculatorControls from "../components/CalculatorControls";
import HistorySection from "../components/HistorySection";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const CalculatorPage = () => {
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Music control
  const toggleMusic = () => {
    const audio = document.getElementById("bg-music");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Load history from localStorage
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

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("calcHistory", JSON.stringify(history));
  }, [history]);

  const calculate = (num1, num2, op) => {
    let calculatedResult;
    switch (op) {
      case "+": calculatedResult = num1 + num2; break;
      case "-": calculatedResult = num1 - num2; break;
      case "*": calculatedResult = num1 * num2; break;
      case "/": calculatedResult = num2 !== 0 ? num1 / num2 : 0; break;
      default: calculatedResult = 0;
    }

    setNum1(num1);
    setNum2(num2);
    setOperation(op);
    setResult(calculatedResult);

    setHistory(prev => [
      { num1, num2, op, result: calculatedResult, id: Date.now() },
      ...prev.slice(0, 4)
    ]);
  };

  const resetCalculator = () => {
    setNum1(null);
    setNum2(null);
    setOperation(null);
    setResult(null);
  };

  const useHistoryItem = (item) => {
    setNum1(item.num1);
    setNum2(item.num2);
    setOperation(item.op);
    setResult(item.result);
  };

  const removeHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearAllHistory = () => {
    setHistory([]);
  };

  return (
 <div className="app-container">
      {/* Background Music (hidden) */}
      <audio id="bg-music" loop autoPlay>
        <source src="/assets/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Improved Header with Home Button */}
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
      
      {/* Main Calculator Content */}
      <main className="calculator-main">
        <div className="calculator-box">
          <AppleDisplay 
            num1={num1} 
            num2={num2} 
            operation={operation} 
            result={result} 
          />
          <CalculatorControls 
            onCalculate={calculate} 
            onReset={resetCalculator} 
          />
        </div>

        <HistorySection 
          history={history}
          onUseItem={useHistoryItem}
          onRemoveItem={removeHistoryItem}
          onClearAll={clearAllHistory}
        />
      </main>
      <AppFooter />
    </div>
  );
};

export default CalculatorPage;