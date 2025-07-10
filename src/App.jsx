import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import DemoPage from "./pages/DemoPage";
import MusicPlayer from "./components/MusicPlayer";
import MathAdventure from './components/MathAdventure';
import musicTrack from './assets/sounds/music.mp3';
import adventureTrack from './assets/sounds/adventure-music.mp3';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const AppWrapper = () => {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(musicTrack);

  useEffect(() => {
    if (!location.pathname.includes('math-adventure')) {
      setCurrentTrack(musicTrack);
    }
  }, [location]);

  const resetMusic = () => {
    setCurrentTrack(musicTrack);
    setIsPlaying(true);
  };

  return (
    <>
      <MusicPlayer 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentTrack={currentTrack}
      />
      <Routes>
        <Route path="/" element={
          <HomePage 
            setIsPlaying={setIsPlaying} 
            setCurrentTrack={() => setCurrentTrack(musicTrack)}
          />
        } />
        <Route path="/math-adventure" element={
          <MathAdventure 
            setCurrentTrack={() => setCurrentTrack(adventureTrack)}
            resetMusic={resetMusic}
          />
        } />
        <Route path="/kalkulator" element={<CalculatorPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;