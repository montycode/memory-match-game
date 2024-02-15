import React from "react";

interface CountryButtonProps {
  value: string; // Country or Capital name
  onClick: (index: number) => void; // Callback function
  selected: boolean; // Whether the button is selected
  matched: boolean; // Whether the button is matched
  isError: boolean; // Whether the button is in error state
}

const CountryButton: React.FC<CountryButtonProps> = ({
  value,
  onClick,
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
      onClick={(event) => onClick(Number(event.currentTarget.value))}
      disabled={selected || matched}
      className={`mx-2 my-2  transition duration-150 ease-in-out rounded border px-16 py-4 text-xl font-bold ${buttonColors}`}
    >
      {value}
    </button>
  );
};

export default CountryButton;
