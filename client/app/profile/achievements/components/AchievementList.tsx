"use client";

import React from "react";
import { Achievement } from "@shared/types";
import { useAuth } from "@/context/AuthContext";
import getAchievementIcon from "../utils/getAchievementIcon";

interface AchievementListProps {
  groupedAchievements: Record<string, Achievement[]>;
  onSelect: (achievement: Achievement) => void;
}

const AchievementList: React.FC<AchievementListProps> = ({
  groupedAchievements,
  onSelect,
}) => {
  const { userData } = useAuth();
  const usersAchievements = userData?.achievements;
  return (
    <>
      {Object.entries(groupedAchievements).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          <div className="flex flex-wrap gap-4">
            {items.map((achievement) => {
              const { _id, title, description } = achievement;
              const isGottenAchievement = usersAchievements
                ? usersAchievements.includes(_id)
                : false;

              return (
                <div
                  key={_id}
                  onClick={() => onSelect(achievement)}
                  className={`cursor-pointer flex items-start gap-4 p-4 border rounded-xl w-[260px] max-w-[260px] min-h-[85px] transition hover:bg-muted
                    ${
                      isGottenAchievement
                        ? "ring-2 ring-blue-500 shadow-blue-500/40 shadow-md"
                        : ""
                    }`}
                >
                  <div className="min-w-[33px] w-[33px] h-full">
                    {getAchievementIcon(category, isGottenAchievement)}
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3
                      className={`font-medium text-sm truncate ${
                        isGottenAchievement
                          ? "text-blue-400 drop-shadow-glow"
                          : ""
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`text-xs line-clamp-2 ${
                        isGottenAchievement
                          ? "text-blue-300 drop-shadow-glow"
                          : "text-muted-foreground"
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default AchievementList;
