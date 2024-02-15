import { useState } from "react";
import MatchGame from "./components/MatchGame";
import data from "./data/countries.json";
import { CountryCapital } from "./types/country-capital";
import "./App.css";

function App() {
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const handleGameWin = () => {
    setGameWon(true);
  };

  const handleGameLoss = () => {
    setGameLost(true);
  };
  return (
    <section className="mx-auto container w-full py-36">
      <div className="flex flex-col justify-center items-center gap">
        <div className="md:text-5xl text-4xl font-black text-center text-gray-800 leading-snug lg:w-3/4">
          <h2>Country-Capital Match Game</h2>
        </div>
        {/* MatchGame component with country-capital data */}
        {!gameWon && !gameLost && (
          <MatchGame
            data={data as CountryCapital}
            onGameWin={handleGameWin}
            onGameLoss={handleGameLoss}
          />
        )}
        {gameWon && <div>Winner!</div>}
        {gameLost && <div>You lost!</div>}
      </div>
    </section>
  );
}

export default App;
