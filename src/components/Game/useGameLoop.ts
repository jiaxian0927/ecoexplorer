import { useEffect, useRef } from 'react';

const useGameLoop = (callback: () => void, fps: number, running: boolean) => {

  const requestRef = useRef<number>(); //Stores the ID of the animation frame (used to cancel the loop later)
  // Updating a ref doesn’t trigger a React re-render
  const previousTimeRef = useRef<number>(); //a variable that stores the last time the game loop executed a frame update
  const fpsInterval = 1000 / fps; //fps = frames per second, 1000 / 60 = ~16.67ms per frame.

  const animate = (time: number) => {
    //Initialise Previous Time (First Frame)
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time; //previousTimeRef.current = the time since the document started loading
    }
    
    const elapsed = time - previousTimeRef.current; //Calculates how much time has passed since the last frame (time - It measures time since the document started loading)
    
    if (elapsed > fpsInterval) {
      previousTimeRef.current = time - (elapsed % fpsInterval); //Updates previousTimeRef.current to the current time (minus any extra time to prevent drift)
      callback();
    }
    
    requestRef.current = requestAnimationFrame(animate);

  };

  useEffect(() => {
    if(!running) return;

    requestRef.current = requestAnimationFrame(animate); //Run the animate function before the next screen repaint
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [running]);
};

export default useGameLoop;