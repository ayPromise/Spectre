import React from "react";

const dayLabels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const TableHead = () => {
  return (
    <thead>
      <tr>
        {dayLabels.map((label, i) => (
          <th
            key={i}
            className={`border-2 border-black p-2 ${
              i >= 5 ? "text-red-600" : ""
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
