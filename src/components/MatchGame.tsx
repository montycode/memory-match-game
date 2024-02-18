import React from "react";
import CountryButton from "./CountryButton";
import useMatchGame from "../hooks/useMatchGame";

interface MatchGameProps {
  data: { [key: string]: string };
  onGameWin: () => void;
  onGameLoss: () => void;
}

const MatchGame: React.FC<MatchGameProps> = ({
  data,
  onGameWin,
  onGameLoss,
}) => {
  // Custom hook to manage the game state
  const { buttons, lives, resetGame } = useMatchGame({
    data,
    onGameWin,
    onGameLoss,
  });

  return (
    <>
      <div className="md:text-2xl text-md text-center text-gray-800 leading-snug lg:w-3/4 mb-4 mt-4">
        <h2>
          Lives:{" "}
          {Array.from({ length: lives }, (_, index) => (
            <span key={index}>❤️</span>
          ))}
        </h2>
      </div>
      <div className="mx-auto my-2 px-6 flex flex-wrap justify-center">
        {/* Render each CountryButton based on the provided button data */}
        {buttons.map((button) => (
          <CountryButton {...button} />
        ))}
      </div>
      <div className="md:text-2xl text-md text-center text-gray-800 leading-snug lg:w-3/4">
        <button
          className="mx-2 my-2  transition duration-150 ease-in-out rounded border px-8 py-4 text-md font-bold bg-white hover:border-red-600 hover:text-red-600 border-red-700 text-red-700"
          onClick={resetGame}
        >
          Restart ⭐
        </button>
      </div>
    </>
  );
};

export default MatchGame;
