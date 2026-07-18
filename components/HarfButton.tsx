"use client";
import { useState, useRef } from 'react';

interface HarfButtonProps {
  harf: string;
  audioPath: string;
}

export default function HarfButton({ harf, audioPath }: HarfButtonProps) {
  const [status, setStatus] = useState<'neutral' | 'correct' | 'wrong' | 'listening'>('neutral');
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const playSound = () => {
    if (!audioPath) return;
    const audio = new Audio(audioPath);
    audio.play().catch((e) => console.error("Playback failed:", e));
  };

  const startRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    setStatus('listening');

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      // Normalization: Remove Fatha and compare
      if (transcript.includes(harf.replace('َ', ''))) {
        setStatus('correct');
      } else {
        setStatus('wrong');
      }
      setTimeout(() => setStatus('neutral'), 2000);
    };

    recognition.onerror = () => {
      setStatus('neutral');
    };

    recognition.start();
  };

  const handleMouseDown = () => {
    pressTimer.current = setTimeout(() => {
      startRecognition();
      pressTimer.current = null;
    }, 500); // 500ms delay to trigger recording
  };

  const handleMouseUp = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      playSound();
    }
  };

  const getStyle = () => {
    if (status === 'correct') return 'bg-green-600/80';
    if (status === 'wrong') return 'bg-red-600/80';
    if (status === 'listening') return 'bg-blue-600/80 animate-pulse';
    return 'bg-white/10 hover:bg-white/20';
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => pressTimer.current && clearTimeout(pressTimer.current)}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      style={{ fontFamily: 'UthmanicHafs, sans-serif' }}
      className={`w-20 h-20 flex items-center justify-center text-5xl border border-white/20 rounded-2xl transition-all shadow-lg text-white font-uthmanic cursor-pointer active:scale-95 ${getStyle()}`}
    >
      {harf}
    </button>
  );
}