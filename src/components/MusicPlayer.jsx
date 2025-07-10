import React, { useEffect, useRef } from "react";
import { FaMusic, FaPlay, FaPause } from "react-icons/fa";

const MusicPlayer = ({ isPlaying, setIsPlaying, currentTrack }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!currentTrack) return;

    const handleTrackChange = async () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      audioRef.current = new Audio(currentTrack);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;

      if (isPlaying) {
        try {
          await audioRef.current.play();
        } catch (e) {
          console.log("Autoplay prevented:", e);
        }
      }
    };

    handleTrackChange();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrack]);

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