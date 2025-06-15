"use client";

import React from "react";
import ScheduleHeader from "./components/ScheduleTable/ScheduleHeader";
import TableHead from "./components/ScheduleTable/TableHead";
import TableBody from "./components/ScheduleTable/TableBody";

const SchedulePage: React.FC = () => {
  return (
    <div>
      <ScheduleHeader />
      <table className="w-full border-collapse text-sm">
        <TableHead />
        <TableBody />
      </table>
    </div>
  );
};

export default SchedulePage;
