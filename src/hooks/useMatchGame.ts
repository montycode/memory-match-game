/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import useLifeCounter from "./useLifeCounter";

interface UseMatchGameProps {
  data: { [key: string]: string };
  onGameWin: () => void;
  onGameLoss: () => void;
}

interface ButtonProps {
  key: number;
  value: string;
  onClick: () => void;
  canSelect: boolean;
  selected: boolean;
  matched: boolean;
  isError: boolean;
}

const useMatchGame = ({ data, onGameWin, onGameLoss }: UseMatchGameProps) => {
  // Convert data object to an array of key-value pairs
  const countryPairs = Object.entries(data);
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState<
    number | null
  >(null);

  // Use a custom hook for managing lives
  const { lives, decreaseLife, resetLives } = useLifeCounter({
    initialLives: 3,
    onGameOver: onGameLoss,
  });

  // Handle button click logic
  const handleButtonClick = (index: number) => {
    // Avoid handling additional clicks while processing logic
    if (selectedButtons.includes(index) || selectedButtons.length >= 2) {
      return;
    }

    // Add clicked button to selectedButtons
    setSelectedButtons((prevSelected) => [...prevSelected, index]);

    if (selectedButtons.length === 1) {
      const [firstIndex] = selectedButtons;
      const [firstCountry, firstCapital] = countryPairs[firstIndex];
      const [secondCountry, secondCapital] = countryPairs[index];

      // Check if the selected country-capital pairs match
      const isMatch =
        (firstCountry === secondCountry && firstCapital === secondCapital) ||
        (firstCountry === secondCapital && firstCapital === secondCountry);

      if (isMatch) {
        // Increase matched pairs count
        setMatchedPairs((prevMatchedPairs) => prevMatchedPairs + 2);

        // If all pairs are matched, call onGameWin callback
        if (matchedPairs + 2 === countryPairs.length) {
          onGameWin();
        }
      } else {
        // Decrease life and track error count if there is no match
        decreaseLife();
        setErrorCount((prevErrorCount) => prevErrorCount + 1);

        // If three errors are made, reset the game
        if (errorCount + 1 === 3) {
          resetGame();
        }
      }

      // Clear selection after processing comparison
      setSelectedButtons([]);
      setCurrentSelectedIndex(null);
    } else {
      // Set the current selected index for the second button click
      setCurrentSelectedIndex(index);
    }
  };

  // Reset the game state
  const resetGame = () => {
    resetLives();
    setMatchedPairs(0);
    setErrorCount(0);
    setSelectedButtons([]);
    setCurrentSelectedIndex(null);
  };

  // Generate button properties based on index and value
  const generateButton = (index: number, value: string): ButtonProps => ({
    key: index,
    value,
    onClick: () => handleButtonClick(index),
    canSelect: !selectedButtons.includes(index) && selectedButtons.length < 2,
    selected: selectedButtons.includes(index),
    matched: selectedButtons.includes(index),
    isError: false,
  });

  // Generate an array of buttons for each country-capital pair
  const generateButtons = () =>
    countryPairs.flatMap(([country, capital], index) => [
      generateButton(index * 2, country),
      generateButton(index * 2 + 1, capital),
    ]);

  // Check if all pairs are matched and call onGameWin callback
  useEffect(() => {
    if (matchedPairs === countryPairs.length) {
      onGameWin();
    }
  }, [matchedPairs, countryPairs.length, onGameWin]);

  // Generate buttons and return the result along with lives count
  const buttons = generateButtons();

  return { buttons, lives };
};

export default useMatchGame;
