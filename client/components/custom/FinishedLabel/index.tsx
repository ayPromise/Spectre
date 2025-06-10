import React from "react";

const FinishedLabel = () => {
  return (
    <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 shadow-sm border border-green-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Завершено
    </span>
  );
};

export default FinishedLabel;
