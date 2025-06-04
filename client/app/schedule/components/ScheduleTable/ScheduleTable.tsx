"use client";

import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const ScheduleTable = () => {
  return (
    <div className="max-w-[1000px]">
      <ScheduleHeader />
      <table className="table-fixed border-collapse">
        <TableHead />
        <TableBody />
      </table>
    </div>
  );
};

export default ScheduleTable;
