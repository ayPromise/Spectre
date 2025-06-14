import React from "react";

type LessonsCount = {
  offline: number;
  online: number;
  passed: number;
};

interface CountBarProps {
  counts: LessonsCount;
}
const RightCountBar: React.FC<CountBarProps> = ({ counts }) => {
  return (
    <div className="absolute top-0 -right-[20px] w-[8px] h-full flex flex-col gap-[10px]">
      {!!counts.offline && (
        <div className="flex-grow flex gap-2 items-center">
          <div className="bg-blue-300 min-w-[8px] h-full rounded"></div>
          <span className="text-blue-400 font-bold text-3xl">
            {counts.offline}
          </span>
        </div>
      )}

      {!!counts.online && (
        <div className="flex-grow flex gap-2 items-center">
          <div className="bg-green-300 min-w-[8px] h-full rounded"></div>
          <span className="text-green-400 font-bold text-3xl">
            {counts.online}
          </span>
        </div>
      )}

      {!!counts.passed && (
        <div className="flex-grow flex gap-2 items-center grayscale">
          <div className="bg-slate-300 min-w-[8px] h-full rounded"></div>
          <span className="text-slate-400 font-bold text-3xl">
            {counts.passed}
          </span>
        </div>
      )}
    </div>
  );
};

export default RightCountBar;
