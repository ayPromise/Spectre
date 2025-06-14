import React from "react";

const Legend = () => {
  return (
    <div className="absolute p-3 bottom-0 right-0 w-[165px] h-[90px] border-2 rounded shadow-xl">
      <div className="flex items-center gap-3">
        <div className="min-w-[15px] min-h-[15px] bg-blue-200 rounded"></div>
        <strong>Офлайн</strong>
      </div>
      <div className="flex items-center gap-3">
        <div className="min-w-[15px] min-h-[15px] bg-green-200 rounded"></div>
        <strong>Онлайн</strong>
      </div>
      <div className="flex items-center gap-3 grayscale">
        <div className="min-w-[15px] min-h-[15px] bg-slate-200 rounded"></div>
        <strong>Завершено</strong>
      </div>
    </div>
  );
};

export default Legend;
