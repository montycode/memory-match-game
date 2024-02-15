import "./App.css";
import MatchGame from "./components/MatchGame";

function App() {
  return (
    <section className="mx-auto container w-full py-36">
      <div className="flex flex-col justify-center items-center gap">
        <div className="md:text-5xl text-4xl font-black text-center text-gray-800 leading-snug lg:w-3/4">
          <h2>Country-Capital Match Game</h2>
        </div>
        <MatchGame />
        <div className="md:text-2xl text-md text-center text-gray-800 leading-snug lg:w-3/4">
          <h2>
            Lifes: <span>❤️❤️❤️</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

export default App;
