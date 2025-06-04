"use client";

import React from "react";
import ScheduleTable from "./components/ScheduleTable/ScheduleTable";
import { ScheduleDateProvider } from "@/context/ScheduleDateContext";

export const dynamic = "force-dynamic";

const SchedulePage: React.FC = () => {
  return (
    <div>
      <ScheduleDateProvider>
        <ScheduleTable />
      </ScheduleDateProvider>
    </div>
  );
};

export default SchedulePage;
