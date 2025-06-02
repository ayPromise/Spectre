import { Button } from "@/components/ui/button";
import { MonthEnum } from "@/types/client/Schedule";
import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface MonthSelectorProps {
  currentMonth: number;
  setPreviousMonth: () => void;
  setNextMonth: () => void;
}

const MonthSelector = ({
  currentMonth,
  setPreviousMonth,
  setNextMonth,
}: MonthSelectorProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Button onClick={setPreviousMonth} aria-label="Previous month">
        <ChevronLeft />
      </Button>

      <div className="px-6 py-2 border rounded-md bg-white shadow text-center min-w-[120px] select-none">
        {MonthEnum[currentMonth]}
      </div>

      <Button onClick={setNextMonth} aria-label="Next month">
        <ChevronRight />
      </Button>
    </div>
  );
};

export default MonthSelector;
