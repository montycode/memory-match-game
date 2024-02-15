import React from "react";

interface ButtonProps {
  key: number;
  value: string;
  onClick: () => void;
  canSelect: boolean;
  selected: boolean;
  matched: boolean;
  isError: boolean;
}

const CountryButton: React.FC<ButtonProps> = ({
  value,
  onClick,
  canSelect,
  selected,
  matched,
  isError,
}) => {
  const buttonColors = selected
    ? "bg-indigo-600 text-white" // If selected
    : matched
    ? "#bg-green-500 text-white" // If matched
    : isError
    ? "bg-red-500 text-white" // If in error state
    : "bg-white hover:border-indigo-600 hover:text-indigo-600 border-indigo-700 text-indigo-700"; // Default

  return (
    <button
      className={`mx-2 my-2  transition duration-150 ease-in-out rounded border px-16 py-4 text-xl font-bold ${buttonColors}`}
      onClick={canSelect ? onClick : undefined}
      disabled={matched}
    >
      {value}
    </button>
  );
};

export default CountryButton;
