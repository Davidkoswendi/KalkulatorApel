// FILE: src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Import halaman
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import DemoPage from "./pages/DemoPage";
import Login from "./components/Login";

import MathAdventurePage from "./pages/MathAdventurePage";
import MathAdventure from "./components/MathAdventure";
import QuizPage from "./pages/QuizPage";
import StoryPage from "./pages/StoryPage";
import LeaderboardPage from "./pages/LeaderboardPage";

// Buku catatan
import BookSelectionPage from "./pages/BookSelectionPage";
import NotesBook from "./pages/NotesBook";
import DivisionBook from "./pages/DivisionBook";
import PowerBook from "./pages/PowerBook";

// Musik
import MusicPlayer from "./components/MusicPlayer";
import musicTrack from "./assets/sounds/music.mp3";
import adventureTrack from "./assets/sounds/adventure-music.mp3";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const AppWrapper = () => {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(musicTrack);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("mathAppUser");
    if (savedUser) {
      const { username } = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUsername(username);
    }
  }, []);

  useEffect(() => {
    if (!location.pathname.includes("math-adventure")) {
      setCurrentTrack(musicTrack);
    }
  }, [location]);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem("mathAppUser", JSON.stringify({ username }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("mathAppUser");
  };

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
        {/* Home */}
        <Route
          path="/"
          element={
            <HomePage
              setIsPlaying={setIsPlaying}
              setCurrentTrack={() => setCurrentTrack(musicTrack)}
            />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/math-adventure" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Petualangan matematika */}
        <Route
          path="/math-adventure"
          element={
            isLoggedIn ? (
              <MathAdventurePage
                username={username}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="adventure" replace />} />
          <Route
            path="adventure"
            element={
              <MathAdventure
                username={username}
                setCurrentTrack={() => setCurrentTrack(adventureTrack)}
                resetMusic={resetMusic}
              />
            }
          />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="story" element={<StoryPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />

          {/* ✅ Nesting semua buku di sini */}
          <Route path="notes" element={<BookSelectionPage />} />
          <Route path="notes/perkalian" element={<NotesBook />} />
          <Route path="notes/pembagian" element={<DivisionBook />} />
          <Route path="notes/pangkat" element={<PowerBook />} />
        </Route>

        {/* Kalkulator & Demo */}
        <Route path="/kalkulator" element={<CalculatorPage />} />
        <Route path="/demo" element={<DemoPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
