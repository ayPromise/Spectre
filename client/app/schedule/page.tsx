import React from "react";
import ScheduleTable from "./components/ScheduleTable/ScheduleTable";

export const dynamic = "force-dynamic";

const SchedulePage: React.FC = () => {
  return (
    <div>
      <ScheduleTable />
    </div>
  );
};

export default SchedulePage;
