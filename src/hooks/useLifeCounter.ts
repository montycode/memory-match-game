import { useState, useEffect } from "react";

interface UseLifeCounterProps {
  initialLives: number;
  onGameOver: () => void;
}

const useLifeCounter = ({ initialLives, onGameOver }: UseLifeCounterProps) => {
  // State to manage player lives
  const [lives, setLives] = useState<number>(initialLives);

  // Function to decrease a life
  const decreaseLife = () => {
    setLives((prevLives) => prevLives - 1);
  };

  // Function to reset lives
  const resetLives = () => {
    setLives(initialLives);
  };

  // Effect to check if the game is over when lives reach zero
  useEffect(() => {
    if (lives === 0) {
      onGameOver();
    }
  }, [lives, onGameOver]);

  // Return lives and life manipulation functions
  return { lives, decreaseLife, resetLives };
};

export default useLifeCounter;
