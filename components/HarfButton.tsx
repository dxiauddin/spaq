"use client";
import { useState, useRef } from 'react';

interface HarfButtonProps {
  harf: string;
  audioPath: string;
}

export default function HarfButton({ harf, audioPath }: HarfButtonProps) {
  const [status, setStatus] = useState<'neutral' | 'correct' | 'wrong' | 'listening'>('neutral');
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  const stopRecognition = () => {
    if (recognitionRef.current) {
      console.log("Mic stopped.");
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setStatus('neutral');
  };

  const startRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported.");
      return;
    }

    console.log("Mic activated for:", harf);
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'ar-SA';
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    
    setStatus('listening');

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim();
      const cleanHarf = harf.replace('َ', '');
      
      console.log(`Mic heard: "${transcript}" | Target: "${cleanHarf}"`);
      
      if (transcript.includes(cleanHarf)) {
        console.log("Match: Correct!");
        setStatus('correct');
      } else {
        console.log("Match: Wrong.");
        setStatus('wrong');
      }
      setTimeout(() => setStatus('neutral'), 2000);
      recognitionRef.current = null;
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech Recognition Error:", event.error);
      stopRecognition();
    };

    recognitionRef.current.start();
  };

  // Helper to handle the "click" only if we weren't just recording
  const handleShortClick = () => {
    console.log("Button clicked (short press).");
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch(console.error);
    }
  };

  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        console.log("Mouse down detected, waiting for long press...");
        pressTimer.current = setTimeout(() => startRecognition(), 500);
      }}
      onMouseUp={() => {
        if (pressTimer.current) {
          // It was a short press
          clearTimeout(pressTimer.current);
          pressTimer.current = null;
          handleShortClick();
        } else if (status === 'listening') {
          // We were recording, now we release
          stopRecognition();
        }
      }}
      onMouseLeave={() => {
        if (pressTimer.current) {
          console.log("Mouse left, cancelling.");
          clearTimeout(pressTimer.current);
          pressTimer.current = null;
        }
      }}
      onTouchStart={(e) => {
        console.log("Touch start detected, waiting for long press...");
        pressTimer.current = setTimeout(() => startRecognition(), 500);
      }}
      onTouchEnd={(e) => {
        if (pressTimer.current) {
          // It was a short press
          clearTimeout(pressTimer.current);
          pressTimer.current = null;
          handleShortClick();
        } else if (status === 'listening') {
          // We were recording, now we release
          stopRecognition();
        }
      }}
      className={`w-20 h-20 flex items-center justify-center text-5xl border border-white/20 rounded-2xl transition-all shadow-lg text-white font-uthmanic cursor-pointer active:scale-95 select-none touch-none
        ${status === 'correct' ? 'bg-green-600/80' : 
          status === 'wrong' ? 'bg-red-600/80' : 
          status === 'listening' ? 'bg-blue-600/80 animate-pulse' : 'bg-white/10'}`}
    >
      {harf}
    </button>
  );
}