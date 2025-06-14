"use client";

import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const ScheduleTable = () => {
  return (
    <div className="">
      <ScheduleHeader />
      <table className="w-full border-collapse text-sm">
        <TableHead />
        <TableBody />
      </table>
    </div>
  );
};

export default ScheduleTable;
