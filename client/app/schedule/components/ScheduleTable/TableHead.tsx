import React from "react";

const dayLabels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const TableHead = () => {
  return (
    <thead>
      <tr>
        {dayLabels.map((label, i) => (
          <th
            key={i}
            className={`border border-slate-300 px-4 py-2 text-left align-middle font-medium ${
              i >= 5 ? "text-red-600" : "text-slate-900"
            }`}
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
