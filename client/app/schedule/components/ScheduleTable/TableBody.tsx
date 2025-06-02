import React from "react";
import { ScheduleType } from "@shared/types";
import ScheduleDay from "./ScheduleDay";
import Lesson from "../Lesson";

interface TableBodyProps {
  totalDays: number;
}

const TableBody = ({ totalDays }: TableBodyProps) => {
  const rows = Math.ceil(totalDays / 7);

  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: 7 }).map((_, colIndex) => {
            const dayIndex = rowIndex * 7 + colIndex;
            if (dayIndex >= totalDays) return <td key={colIndex} />;

            return (
              <ScheduleDay key={colIndex} day={dayIndex + 1}>
                <Lesson
                  title={"Базові навички пілотування"}
                  type={ScheduleType.PracticalFlight}
                />
              </ScheduleDay>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
