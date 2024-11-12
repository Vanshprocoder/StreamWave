import { useEffect } from 'react';

const BackgroundAudioHandler = ({ audioUrl }) => {
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.play();

    return () => {
      audio.pause();
    };
  }, [audioUrl]);

  return null;
};

export default BackgroundAudioHandler;
