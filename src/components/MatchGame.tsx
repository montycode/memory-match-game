import React from "react";
import CountryButton from "./CountryButton";

const MatchGame = () => {
  return (
    <div className="mx-auto my-2 px-6 flex flex-wrap justify-center">
      <CountryButton />
      <CountryButton />
      <CountryButton />
      <CountryButton />
      <CountryButton />
      <CountryButton />
    </div>
  );
};

export default MatchGame;
