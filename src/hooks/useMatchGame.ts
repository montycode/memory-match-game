import { useState, useEffect } from "react";
import useLifeCounter from "./useLifeCounter";
import { CountryCapital } from "../types/country-capital";
import { StatusEnum, ButtonProps } from "../types/country-button.d";

interface UseMatchGameProps {
  data: { [key: string]: string };
  onGameWin: () => void;
  onGameLoss: () => void;
}

const useMatchGame = ({ data, onGameWin, onGameLoss }: UseMatchGameProps) => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [errorPairs, setErrorPairs] = useState<number[]>([]);
  const [matchCount, setMatchCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);

  const countries = Object.keys(data);
  const capitals = Object.values(data);

  // Merge country and capital names and shuffle them
  const dataElements = countries.concat(capitals);

  // Check if the selected pair is a match
  const validateMatch = (
    data: CountryCapital,
    firstValue: string,
    secondValue: string
  ) => {
    return data[firstValue] == secondValue || data[secondValue] == firstValue;
  };

  // Use a custom hook for managing lives
  const { lives, decreaseLife, resetLives } = useLifeCounter({
    initialLives: 3,
    onGameOver: onGameLoss,
  });

  // Handle button click logic
  const handleButtonClick = (index: number) => {
    setErrorPairs([]);

    if (selectedButtons.includes(index) || selectedButtons.length >= 2) {
      return;
    }

    // Add clicked button to selectedButtons
    setSelectedButtons((prevSelected) => [...prevSelected, index]);

    if (selectedButtons.length === 1) {
      const firstSelectedIndex = selectedButtons[0];
      const firstValue = dataElements[firstSelectedIndex];
      const secondValue = dataElements[index];

      const isMatch = validateMatch(data, firstValue, secondValue);

      if (isMatch) {
        // Add matched pair to matchedPairs
        setMatchedPairs((prevMatchedPairs) => [
          ...prevMatchedPairs,
          index,
          firstSelectedIndex,
        ]);

        // Increase matched pairs count
        setMatchCount((prevMatchCount) => prevMatchCount + 2);

        // If all pairs are matched, call onGameWin callback
        if (matchCount === dataElements.length - 2) {
          onGameWin();
        }
      } else {
        // Decrease life and track error count if there is no match
        // Add error pair to errorPairs
        setErrorPairs((prevSelected) => [
          ...prevSelected,
          index,
          firstSelectedIndex,
        ]);

        decreaseLife();

        setErrorCount((prevErrorCount) => prevErrorCount + 1);

        if (errorCount + 1 === 3) {
          onGameLoss();
        }
      }

      // Clear selection after processing comparison
      setSelectedButtons([]);
    } else {
      // Set the current selected index for the second button click
    }
  };

  // Reset the game state
  const resetGame = () => {
    resetLives();
    setMatchedPairs([]);
    setMatchCount(0);
    setErrorCount(0);
    setSelectedButtons([]);
    setErrorPairs([]);
  };

  const getButtonStatus = (index: number) => {
    const isSelected = selectedButtons.includes(index);
    const isMatched = matchedPairs.includes(index);
    const hasError = errorPairs.includes(index);

    if (isSelected) {
      return StatusEnum.SELECTED;
    } else if (isMatched) {
      return StatusEnum.MATCHED;
    } else if (hasError) {
      return StatusEnum.ERROR;
    } else {
      return StatusEnum.DEFAULT;
    }
  };

  // Generate button properties based on index and value
  const generateButton = (index: number, value: string): ButtonProps => ({
    key: index,
    value,
    onClick: () => handleButtonClick(index),
    canSelect: !selectedButtons.includes(index) && selectedButtons.length < 2,
    status: getButtonStatus(index),
  });

  // Generate an array of buttons for each country-capital pair
  const generateButtons = () =>
    dataElements.flatMap((value, index) => generateButton(index, value));

  // Check if all pairs are matched and call onGameWin callback
  useEffect(() => {
    if (matchCount === dataElements.length / 2) {
      onGameWin();
    }
  }, [matchCount, onGameWin, dataElements.length]);

  // Generate buttons and return the result along with lives count
  const buttons = generateButtons();

  return { buttons, lives, resetGame };
};

export default useMatchGame;
