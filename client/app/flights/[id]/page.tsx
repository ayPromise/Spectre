import React from "react";

const FlightPage = () => {
  return (
    <div className="p-6 space-y-4 flex-grow">
      <div className="h-[80%] flex gap-4">
        <div className="relative border-2 border-dashed border-indigo-400 rounded-lg flex items-center justify-center h-full w-[80%] bg-indigo-50">
          <span className="absolute top-2 left-2 bg-indigo-400 text-white text-xs font-semibold px-2 py-1 rounded">
            У розробці
          </span>
          <p className="text-indigo-600 text-lg font-medium">
            Тут буде інтерактивна карта польоту
          </p>
        </div>

        <div className="relative border-2 border-dashed border-indigo-400 rounded-lg flex items-center justify-center h-full w-[20%] bg-indigo-50">
          <span className="absolute top-2 left-2 bg-indigo-400 text-white text-xs font-semibold px-2 py-1 rounded">
            У розробці
          </span>
          <p className="text-indigo-600 text-lg font-medium">Дані файлу</p>
        </div>
      </div>

      <div className="relative border-2 border-dashed border-indigo-400 rounded-lg h-[20%] flex items-center justify-center bg-indigo-50">
        <span className="absolute top-2 left-2 bg-indigo-400 text-white text-xs font-semibold px-2 py-1 rounded">
          У розробці
        </span>
        <p className="text-indigo-600 text-lg font-medium">
          Інформація про телеметрію в контретний момент польоту
        </p>
      </div>
    </div>
  );
};

export default FlightPage;
