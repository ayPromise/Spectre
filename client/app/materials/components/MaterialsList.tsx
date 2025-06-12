"use client";

import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { MaterialUnion, Specification } from "@shared/types";
import useDebounce from "@/hooks/useDebounce";
import NotFoundMessage from "@/components/custom/NotFoundMessage";
import MaterialCardLarge from "./MaterialCardLarge";
import { Button } from "@/components/ui/button";
import { MaterialType, SpecificationeNameUA } from "@shared/types/Enums";
import { useAuth } from "@/context/AuthContext";

interface MaterialsListProps {
  materials: MaterialUnion[];
  listType: MaterialType | "all";
}

const MaterialsList: React.FC<MaterialsListProps> = ({
  materials,
  listType,
}) => {
  const { userData } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState<Specification | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const toggleType = (type: Specification) => {
    if (activeType === type) setActiveType(null);
    else setActiveType(type);
  };

  const filteredMaterials = useMemo(() => {
    if (!userData) return [];

    const isCompleted = (item: MaterialUnion) => {
      if (item.kind === MaterialType.Article)
        return userData.completedArticles?.includes(item._id);
      if (item.kind === MaterialType.Lecture)
        return userData.completedLectures?.includes(item._id);
      if (item.kind === MaterialType.Video)
        return userData.completedVideos?.includes(item._id);
      return false;
    };

    const matchesFilters = (item: MaterialUnion) => {
      const matchesSearch =
        !debouncedSearch.trim() ||
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesType = !activeType || activeType === item.type;
      return matchesSearch && matchesType;
    };

    const incomplete = materials.filter(
      (item) => matchesFilters(item) && !isCompleted(item)
    );
    const complete = materials.filter(
      (item) => matchesFilters(item) && isCompleted(item)
    );

    return [...incomplete, ...complete];
  }, [debouncedSearch, materials, activeType, userData]);

  const completedCount =
    listType === "all"
      ? userData
        ? [
            ...(userData.completedArticles ?? []),
            ...(userData.completedLectures ?? []),
            ...(userData.completedVideos ?? []),
          ].length
        : 0
      : listType === MaterialType.Article
      ? userData?.completedArticles.length ?? 0
      : listType === MaterialType.Lecture
      ? userData?.completedLectures.length ?? 0
      : listType === MaterialType.Video
      ? userData?.completedVideos.length ?? 0
      : 0;

  const progressCompletion = materials
    ? Math.floor((completedCount / materials.length) * 100)
    : 0;

  return (
    <div className="space-y-6 grow-1 flex flex-col">
      <div className="flex gap-2">
        <div className="flex flex-col gap-4 w-1/2">
          <Input
            placeholder="Пошук матеріалів..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-[30px] max-h-[30px]"
          />

          <div className="flex gap-2 overflow-x-auto custom-scrollbar">
            {Object.values(Specification).map((type) => (
              <Button
                key={type}
                variant={activeType === type ? "default" : "ghost"}
                onClick={() => toggleType(type)}
                className={`rounded-full text-sm border transition`}
              >
                {SpecificationeNameUA[type]}
              </Button>
            ))}
          </div>
        </div>
        <div className="border shadow border-gray-100 rounded-md flex-grow px-4 flex justify-between items-center font-semibold relative p-3">
          <div className="absolute top-0 left-0 w-[150px] h-[30px] border-r-2 border-b-2 border-gray-200 rounded-b flex justify-center items-center">
            <h3 className="text-[11px]">Успішність проходження</h3>
          </div>
          <div className="flex flex-col gap-4 items-center mt-[30px]">
            <div className="flex gap-2 flex-grow text-[14px] -ml-1">
              <span>
                К-сть {listType === "all" && "матеріалів"}
                {listType === MaterialType.Article && "статтей"}
                {listType === MaterialType.Lecture && "лекцій"}
                {listType === MaterialType.Video && "відео"}:
              </span>
              {materials.length}
            </div>
          </div>
          <div className="relative w-[65%] h-[70%] border-2 rounded-md">
            <div
              className={` h-full bg-black top-0 left-0 rounded-md`}
              style={{ width: `${progressCompletion}%` }}
            >
              <span
                className={`select-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-2xl ${
                  progressCompletion > 40 ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {progressCompletion}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 grow-1 h-full">
        {filteredMaterials.length === 0 ? (
          <NotFoundMessage>Нічого не знайдено</NotFoundMessage>
        ) : (
          filteredMaterials.map((item) => (
            <MaterialCardLarge key={item._id} material={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default MaterialsList;
