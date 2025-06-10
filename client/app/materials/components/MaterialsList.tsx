"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, BookOpen, FileText, Video } from "lucide-react";
import Link from "next/link";
import { MaterialType, MaterialTypeNameUA } from "@shared/types/Enums";
import { MaterialUnion } from "@shared/types";
import useDebounce from "@/hooks/useDebounce";
import NotFoundMessage from "@/components/custom/NotFoundMessage";
import { useAuth } from "@/context/AuthContext";

const iconByKind: Record<MaterialType, React.ReactNode> = {
  [MaterialType.Article]: <FileText />,
  [MaterialType.Video]: <Video />,
  [MaterialType.Lecture]: <BookOpen />,
};

interface MaterialsListProps {
  materials: MaterialUnion[];
}

const MaterialsList: React.FC<MaterialsListProps> = ({ materials }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { userData } = useAuth();

  const filteredMaterials = useMemo(() => {
    if (!debouncedSearch.trim()) return materials;
    return materials.filter((item) =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, materials]);

  return (
    <div className="space-y-6 grow-1 flex flex-col">
      <Input
        placeholder="Пошук матеріалів..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      <div className="flex flex-col gap-6 grow-1 h-full">
        {filteredMaterials.length === 0 ? (
          <NotFoundMessage>Нічого не знайдено</NotFoundMessage>
        ) : (
          filteredMaterials.map((item, index) => {
            const kind = item.kind.toLowerCase();
            const id = item._id;

            const isFinished =
              (item.kind === MaterialType.Article &&
                userData?.completedArticles.includes(item._id)) ||
              (item.kind === MaterialType.Lecture &&
                userData?.completedLectures.includes(item._id)) ||
              (item.kind === MaterialType.Video &&
                userData?.completedVideos.includes(item._id));

            return (
              <Link href={`/materials/${kind}/${id}`} key={id || index}>
                <div
                  className={`
      flex flex-col items-start gap-4 rounded-2xl border p-6 transition-all md:flex-row md:items-center
      ${
        isFinished
          ? "bg-green-50 border-green-200 shadow-lg hover:shadow-xl"
          : "bg-background border shadow-sm hover:shadow-md"
      }
    `}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-lg
          ${
            isFinished
              ? "bg-green-100 text-green-600"
              : "bg-muted text-muted-foreground"
          }`}
                    >
                      {iconByKind[item.kind] || <FileText />}
                    </span>

                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        {isFinished && (
                          <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 shadow-sm border border-green-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Завершено
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {MaterialTypeNameUA[item.kind]}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant={isFinished ? "default" : "outline"}
                    className={`ml-auto transition-all ${
                      isFinished
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : ""
                    }`}
                  >
                    Переглянути <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MaterialsList;
