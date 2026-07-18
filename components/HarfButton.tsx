"use client";

export default function HarfButton({ harf }: { harf: string }) {
  const handleClick = () => console.log("Clicked:", harf);

  return (
    <button 
      onClick={handleClick}
      style={{ fontFamily: 'UthmanicHafs, sans-serif' }}
      className="w-20 h-20 flex items-center justify-center text-5xl 
                 bg-white/10 backdrop-blur-md border border-white/20 
                 rounded-2xl hover:bg-white/20 transition-all 
                 shadow-lg text-white font-uthmanic"
    >
      {harf}
    </button>
  );
}