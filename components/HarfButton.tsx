"use client";
import { useState, useRef, useEffect } from 'react';

interface HarfButtonProps {
  harf: string;
  audioPath: string;
  id: string; // Added unique ID prop
}

export default function HarfButton({ harf, audioPath, id }: HarfButtonProps) {
  const [isPermanent, setIsPermanent] = useState(false);
  const [status, setStatus] = useState<'neutral' | 'correct' | 'wrong' | 'listening'>('neutral');
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);
  const isActionTriggered = useRef(false);

  // Use the unique ID for this specific button's persistence
  const storageKey = `harf-status-${id}`;

  // Load persistence state
  useEffect(() => {
    if (localStorage.getItem(storageKey) === 'correct') {
      setIsPermanent(true);
    }
  }, [storageKey]);

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setStatus('neutral');
  };

  const startRecognition = () => {
    if (isPermanent) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'ar-SA';
    setStatus('listening');

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim();
      const cleanHarf = harf.replace('َ', '');
      
      const soundMap: Record<string, string> = {
        'ألف': 'أ', 'باء': 'ب', 'تاء': 'ت', 'ثاء': 'ث', 
        'جيم': 'ج', 'حاء': 'ح', 'خاء': 'خ'
      };

      const matchedChar = soundMap[transcript] || transcript;

      if (matchedChar.includes(cleanHarf)) {
        setStatus('correct');
        setIsPermanent(true);
        localStorage.setItem(storageKey, 'correct'); // Save using unique ID
      } else {
        setStatus('wrong');
        setTimeout(() => setStatus('neutral'), 2000);
      }
      recognitionRef.current = null;
    };
    recognitionRef.current.onerror = () => stopRecognition();
    recognitionRef.current.start();
  };

  const handleShortClick = () => {
    if (isActionTriggered.current) return;
    isActionTriggered.current = true;
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch(console.error);
    }
    setTimeout(() => { isActionTriggered.current = false; }, 300);
  };

  const handleRelease = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
      handleShortClick();
    } else if (status === 'listening') {
      stopRecognition();
    }
  };

  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); pressTimer.current = setTimeout(() => startRecognition(), 500); }}
      onMouseUp={handleRelease}
      onMouseLeave={() => { if (pressTimer.current) clearTimeout(pressTimer.current); pressTimer.current = null; }}
      onTouchStart={(e) => { pressTimer.current = setTimeout(() => startRecognition(), 500); }}
      onTouchEnd={(e) => { e.preventDefault(); handleRelease(); }}
      className={`w-20 h-20 flex items-center justify-center text-5xl border border-white/20 rounded-2xl transition-all shadow-lg text-white font-uthmanic cursor-pointer active:scale-95 select-none touch-none
        ${isPermanent ? 'bg-green-600/80' : 
          status === 'correct' ? 'bg-green-600/80' : 
          status === 'wrong' ? 'bg-red-600/80' : 
          status === 'listening' ? 'bg-blue-600/80 animate-pulse' : 'bg-white/10'}`}
    >
      {harf}
    </button>
  );
}