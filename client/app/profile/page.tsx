"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/custom/Loader";
import { getAchievements } from "./achievements/utils/getAchievements";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import Link from "next/link";
import getAchievementIcon from "./achievements/utils/getAchievementIcon";

const ProfilePage: React.FC = () => {
  const { userData } = useAuth();

  const { data: achievements } = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievements,
  });

  if (!userData || !achievements) return <Loader />;

  const userAchievements = achievements.filter((ach) =>
    userData.achievements.includes(ach._id)
  );

  return (
    <div className="max-w-5xl px-10 py-4 space-y-10">
      <div className="text-center space-y-2">
        <div className="w-full">
          <h1 className="text-4xl font-extrabold">Профіль користувача</h1>
          <p className="text-muted-foreground">
            Перегляньте інформацію про себе та свої досягнення
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info label="Ім’я" value={userData.firstName} />
          <Info label="Прізвище" value={userData.lastName} />
          <Info label="Email" value={userData.email} />
          <Info label="Роль" value={userData.role} />
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Отримані досягнення ({userAchievements.length}):
        </h2>
        <Link href={"/profile/achievements"}>
          <Button variant="outline" size="sm">
            Подивитися всі
          </Button>
        </Link>
      </div>

      {userAchievements.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userAchievements.map((ach) => (
            <div
              key={ach._id}
              className="cursor-pointer flex items-start gap-4 p-4 rounded-xl w-[270px] max-w-[270px] min-h-[85px] transition hover:bg-muted ring-2 ring-indigo-600 shadow-blue-500/40 shadow-md"
            >
              <div className="min-w-[33px] w-[33px] h-full">
                {getAchievementIcon(ach.category, true)}
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="font-medium text-sm truncate text-indigo-400 drop-shadow-glow">
                  {ach.title}
                </h3>
                <p className="text-xs line-clamp-2 text-indigo-300 drop-shadow-glow">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Ви ще не отримали жодного досягнення.
        </p>
      )}
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-2 items-end">
    <p className="text-sm text-muted-foreground">{label}:</p>
    <p className="text-base font-medium">{value}</p>
  </div>
);

export default ProfilePage;
