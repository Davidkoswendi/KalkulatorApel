/**
 * FILE: src/components/MusicPlayer.js
 * KOMPONEN PEMUTAR MUSIK
 * - Mengontrol pemutaran musik latar
 * - Handle perubahan track
 */

import React, { useEffect, useRef } from "react";
import { FaMusic, FaPlay, FaPause } from "react-icons/fa";

const MusicPlayer = ({ isPlaying, setIsPlaying, currentTrack }) => {
  // Ref untuk menyimpan objek Audio
  const audioRef = useRef(null);

  // Effect untuk handle perubahan track
  useEffect(() => {
    if (!currentTrack) return;

    const handleTrackChange = async () => {
      // Hentikan track sebelumnya jika ada
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      // Buat objek Audio baru
      audioRef.current = new Audio(currentTrack);
      audioRef.current.loop = true; // Set loop
      audioRef.current.volume = 0.5; // Set volume

      // Auto play jika sedang dalam state playing
      if (isPlaying) {
        try {
          await audioRef.current.play();
        } catch (e) {
          console.log("Autoplay prevented:", e);
        }
      }
    };

    handleTrackChange();

    // Cleanup: Hentikan musik saat komponen unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrack]);

  // Effect untuk handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log("Play error:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <button 
      className={`music-control ${isPlaying ? 'playing' : ''}`}
      onClick={() => setIsPlaying(!isPlaying)}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? <FaPause /> : <FaPlay />}
      <FaMusic className="music-icon" />
    </button>
  );
};

export default MusicPlayer;