/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { StatusEnum, ButtonProps } from "../types/country-button.d";

const CountryButton: React.FC<ButtonProps> = ({
  value,
  onClick,
  canSelect,
  status,
}) => {
  const isSelected = status === StatusEnum.SELECTED;
  const isMatched = status === StatusEnum.MATCHED;

  let buttonColors = "";

  switch (status) {
    case StatusEnum.SELECTED:
      buttonColors = "bg-indigo-600 text-white";
      break;
    case StatusEnum.MATCHED:
      buttonColors = "bg-green-500 text-white";
      break;
    case StatusEnum.ERROR:
      buttonColors = "bg-red-500 text-white";
      break;
    default:
      buttonColors =
        "bg-white hover:border-indigo-600 hover:text-indigo-600 border-indigo-700 text-indigo-700";
      break;
  }

  return (
    <button
      className={`mx-2 my-2  transition duration-150 ease-in-out rounded border px-16 py-4 text-xl font-bold ${buttonColors}`}
      onClick={canSelect ? onClick : undefined}
      disabled={isMatched || isSelected}
    >
      {value}
    </button>
  );
};

export default CountryButton;
