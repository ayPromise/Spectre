"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAchievements } from "./utils/getAchievements";
import groupByCategory from "./utils/groupByCategory";
import { Achievement } from "@shared/types";
import ErrorMessage from "@/components/custom/ErrorMessage";
import NotFoundMessage from "@/components/custom/NotFoundMessage";
import { useMaterials } from "@/context/MaterialsContext";
import Loader from "@/components/custom/Loader";
import AchievementList from "./components/AchievementList";
import AchievementDialog from "./components/AchievementDialog";
import { useAccess } from "@/hooks/useAccess";
import CreateButton from "@/components/custom/CreateButton";
import AchievementForm from "./components/AchievmentForm";
import { useAuth } from "@/context/AuthContext";
import { tryAssignAchievements } from "@/lib/tryAssignAchievements";

const AchievementsPage: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const { materials } = useMaterials();
  const { hasAdminAccess, hasInstructorAccess } = useAccess();
  const [isOpenCreationForm, setIsOpenCreationForm] = useState(false);
  const { userData, setUserData } = useAuth();

  const {
    data: achievements,
    isLoading,
    isError,
    error,
    refetch: refetchAchievements,
  } = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievements,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (userData && achievements) {
      (async () => {
        await tryAssignAchievements(userData, setUserData);
        await refetchAchievements();
      })();
    }
  }, [userData, achievements, setUserData, refetchAchievements]);

  useEffect(() => {
    localStorage.removeItem("hasNewAchievements");
    window.dispatchEvent(new Event("achievement-change"));
  }, []);

  const grouped = achievements ? groupByCategory(achievements) : {};

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-2">Мої досягнення</h1>
        {(hasAdminAccess || hasInstructorAccess) && (
          <CreateButton onClick={() => setIsOpenCreationForm(true)} />
        )}
      </div>
      <p className="text-muted-foreground mb-6">
        Досягнення відкриваються за активну участь у навчанні, перегляді лекцій,
        читанні статей та перегляді відео.
      </p>

      {isLoading && <Loader />}

      {isError && (
        <ErrorMessage>
          Не вдалося завантажити досягнення:{" "}
          {error instanceof Error ? error.message : "Невідома помилка"}
        </ErrorMessage>
      )}

      {!isLoading && achievements?.length === 0 && (
        <NotFoundMessage>У вас поки немає жодного досягнення.</NotFoundMessage>
      )}

      {!isLoading && !isError && achievements && (
        <AchievementList
          groupedAchievements={grouped}
          onSelect={setSelectedAchievement}
        />
      )}

      <AchievementDialog
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        materials={materials}
      />

      <AchievementForm
        open={isOpenCreationForm}
        onClose={() => setIsOpenCreationForm(false)}
      />
    </div>
  );
};

export default AchievementsPage;
