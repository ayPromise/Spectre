"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAchievements } from "./utils/getAchievements";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

const AchievementsPage: React.FC = () => {
  const {
    data: achievements,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievements,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">Мої досягнення</h1>
      <p className="text-muted-foreground mb-6">
        Досягнення відкриваються за активну участь у навчанні, перегляді лекцій,
        читанні статей та перегляді відео.
      </p>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-red-500 font-medium">
          Не вдалося завантажити досягнення:{" "}
          {(error as Error)?.message || "Невідома помилка"}
        </p>
      )}

      {!isLoading && achievements?.length === 0 && (
        <p className="text-muted-foreground">
          У вас поки немає жодного досягнення.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements?.map((achievement) => (
          <Card key={achievement._id} className="border-primary/30">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {achievement.title}
                <Badge variant="outline">{achievement.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{achievement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
