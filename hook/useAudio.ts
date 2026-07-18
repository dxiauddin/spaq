import { useEffect, useRef } from 'react';

export const usePreloadAudio = (filePaths: string[]) => {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    filePaths.forEach((path) => {
      const audio = new Audio(path);
      audio.load(); // Forces the browser to fetch the file
      audioRefs.current[path] = audio;
    });
  }, [filePaths]);

  const play = (path: string) => {
    if (audioRefs.current[path]) {
      audioRefs.current[path].currentTime = 0; // Rewind to start
      audioRefs.current[path].play();
    }
  };

  return play;
};