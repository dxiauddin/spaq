"use client";

interface HarfButtonProps {
  harf: string;
  audioPath: string; // Pass the path directly to the button
}

export default function HarfButton({ harf, audioPath }: HarfButtonProps) {
  
  const playSound = () => {
    const audio = new Audio(audioPath);
    // Play with error handling to catch blocking or missing files
    audio.play().catch((e) => console.error("Playback failed:", e));
  };

  return (
    <button 
      onClick={playSound}
      style={{ fontFamily: 'UthmanicHafs, sans-serif' }}
      className="w-20 h-20 flex items-center justify-center text-5xl 
                 bg-white/10 backdrop-blur-md border border-white/20 
                 rounded-2xl hover:bg-white/20 transition-all 
                 shadow-lg text-white font-uthmanic cursor-pointer
                 active:scale-95 transition-transform"
    >
      {harf}
    </button>
  );
}