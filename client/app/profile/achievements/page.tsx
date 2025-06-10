"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getAchievements } from "./utils/getAchievements";
import { BookOpen, PlayCircle, ShieldCheck } from "lucide-react";
import groupByCategory from "./utils/groupByCategory";
import { Achievement } from "@shared/types";
import ErrorMessage from "@/components/custom/ErrorMessage";
import NotFoundMessage from "@/components/custom/NotFoundMessage";
import { useMaterials } from "@/context/MaterialsContext";
import MaterialCardSmall from "./components/MaterialCardSmall";

export const dynamic = "force-dynamic";

const AchievementsPage: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const { materials } = useMaterials();

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

  const grouped = achievements ? groupByCategory(achievements) : {};

  const getIcon = (category: string) => {
    if (category.includes("Акт 1"))
      return <BookOpen className="text-blue-500" />;
    if (category.includes("Акт 2"))
      return <PlayCircle className="text-green-500" />;
    return <ShieldCheck className="text-purple-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
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
        <ErrorMessage>
          Не вдалося завантажити досягнення:{" "}
          {(error as Error)?.message || "Невідома помилка"}
        </ErrorMessage>
      )}

      {!isLoading && achievements?.length === 0 && (
        <NotFoundMessage>У вас поки немає жодного досягнення.</NotFoundMessage>
      )}

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          <div className="flex flex-wrap gap-4">
            {items.map((achievement) => (
              <div
                key={achievement._id}
                onClick={() => setSelectedAchievement(achievement)}
                className="cursor-pointer flex items-start gap-4 p-4 border rounded-xl w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] hover:bg-muted transition"
              >
                <div className="shrink-0">{getIcon(category)}</div>
                <div className="flex flex-col">
                  <h3 className="font-medium text-sm truncate">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground text-xs line-clamp-2">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Dialog
        open={!!selectedAchievement}
        onOpenChange={() => setSelectedAchievement(null)}
      >
        <DialogContent>
          {selectedAchievement && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAchievement.title}</DialogTitle>
                <Badge variant="outline" className="mt-2">
                  {selectedAchievement.category}
                </Badge>
              </DialogHeader>
              <DialogDescription className="mt-4 text-sm">
                {selectedAchievement.description}
              </DialogDescription>
              <div className="mt-4 space-y-2">
                <p className="font-medium text-sm">
                  Щоб отримати досягнення, пройди такі матеріали:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {selectedAchievement.requiredMaterials.map((material) => {
                    const materialById = materials.find(
                      (m) => m._id === "6847498f427bb217f65a2cdf"
                    );
                    console.log(materialById);
                    return (
                      materialById && (
                        <MaterialCardSmall material={materialById} />
                      )
                    );
                  })}
                </ul>
                <Badge variant="destructive" className="mt-4">
                  Ще не отримано
                </Badge>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AchievementsPage;
