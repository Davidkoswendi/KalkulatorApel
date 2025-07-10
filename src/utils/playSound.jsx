export const playSound = (url) => {
  const audio = new Audio(url);
  audio.volume = 0.6;
  audio.play().catch((err) => console.warn("Audio failed:", err));
};
