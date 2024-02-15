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
  const { buttons, lives } = useMatchGame({ data, onGameWin, onGameLoss });

  return (
    <>
      <div className="mx-auto my-2 px-6 flex flex-wrap justify-center">
        {/* Render each CountryButton based on the provided button data */}
        {buttons.map((button) => (
          <CountryButton {...button} />
        ))}
      </div>
      <div className="md:text-2xl text-md text-center text-gray-800 leading-snug lg:w-3/4">
        <h2>
          Lives:{" "}
          {Array.from({ length: lives }, (_, index) => (
            <span key={index}>❤️</span>
          ))}
        </h2>
      </div>
    </>
  );
};

export default MatchGame;
