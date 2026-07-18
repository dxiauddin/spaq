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
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setStatus('neutral');
  };

  const startRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'ar-SA';
    
    setStatus('listening');

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim();
      const cleanHarf = harf.replace('َ', '');
      
      if (transcript.includes(cleanHarf)) {
        setStatus('correct');
      } else {
        setStatus('wrong');
      }
      setTimeout(() => setStatus('neutral'), 2000);
      recognitionRef.current = null;
    };

    recognitionRef.current.onerror = () => stopRecognition();
    recognitionRef.current.start();
  };

  const handleAction = () => {
    // If already listening, clicking again cancels it
    if (status === 'listening') {
      stopRecognition();
      return;
    }
    
    // Otherwise play sound
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch(console.error);
    }
  };

  return (
    <button
      // Use touch/mouse start to detect the "hold"
      onMouseDown={() => {
        pressTimer.current = setTimeout(() => startRecognition(), 500);
      }}
      // On release, if we were holding, stop timer. If we weren't holding, trigger action
      onMouseUp={() => {
        if (pressTimer.current) {
          clearTimeout(pressTimer.current);
          handleAction();
        } else if (status === 'listening') {
          stopRecognition();
        }
      }}
      onMouseLeave={() => {
        if (pressTimer.current) clearTimeout(pressTimer.current);
      }}
      onTouchStart={() => {
        pressTimer.current = setTimeout(() => startRecognition(), 500);
      }}
      onTouchEnd={() => {
        if (pressTimer.current) {
          clearTimeout(pressTimer.current);
          handleAction();
        } else if (status === 'listening') {
          stopRecognition();
        }
      }}
      className={`w-20 h-20 flex items-center justify-center text-5xl border border-white/20 rounded-2xl transition-all shadow-lg text-white font-uthmanic cursor-pointer active:scale-95 
        ${status === 'correct' ? 'bg-green-600/80' : 
          status === 'wrong' ? 'bg-red-600/80' : 
          status === 'listening' ? 'bg-blue-600/80 animate-pulse' : 'bg-white/10'}`}
    >
      {harf}
    </button>
  );
}