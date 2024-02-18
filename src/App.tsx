import { useState } from "react";
import MatchGame from "./components/MatchGame";
import data from "./data/countries.json";
import { CountryCapital } from "./types/country-capital";
import "./App.css";

function App() {
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  console.log(gameWon, gameLost);

  const handleGameWin = () => {
    setGameWon(true);
  };

  const handleGameLoss = () => {
    setGameLost(true);
  };
  return (
    <section className="mx-auto container w-full py-36">
      <div className="flex flex-col justify-center items-center gap">
        <div className="md:text-5xl text-4xl font-black text-center text-gray-800 leading-snug lg:w-3/4 space-y-6">
          <h2>Country-Capital Match Game</h2>
          {gameWon && <p>Winner! 🏆</p>}
          {gameLost && <p>You lost! 😥</p>}
        </div>
        {/* MatchGame component with country-capital data */}
        <MatchGame
          data={data as CountryCapital}
          onGameWin={handleGameWin}
          onGameLoss={handleGameLoss}
        />
      </div>
    </section>
  );
}

export default App;
