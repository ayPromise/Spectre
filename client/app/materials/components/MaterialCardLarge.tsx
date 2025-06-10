"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Video } from "lucide-react";
import { MaterialType, MaterialUnion } from "@shared/types";
import { MaterialTypeNameUA } from "@shared/types/Enums";
import isMaterialFinished from "../[kind]/[id]/utils/isMaterialFinished";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

interface MaterialCardLargeProps {
  material: MaterialUnion;
}

const iconByKind: Record<MaterialType, React.ReactNode> = {
  [MaterialType.Article]: <FileText />,
  [MaterialType.Video]: <Video />,
  [MaterialType.Lecture]: <BookOpen />,
};

const MaterialCardLarge: React.FC<MaterialCardLargeProps> = ({ material }) => {
  const { userData } = useAuth();
  const kind = material.kind.toLowerCase();
  const id = material._id;

  const isFinished = isMaterialFinished(userData, material.kind, material._id);
  return (
    <Link href={`/materials/${kind.toLowerCase()}/${id}`} key={id}>
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
            className={`
              flex h-14 w-14 items-center justify-center rounded-lg
              ${
                isFinished
                  ? "bg-green-100 text-green-600"
                  : "bg-muted text-muted-foreground"
              }
            `}
          >
            {iconByKind[material.kind] || <FileText />}
          </span>

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-lg font-semibold">{material.title}</h3>
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
              {MaterialTypeNameUA[material.kind]}
            </p>
          </div>
        </div>

        <Button
          className={`ml-auto transition-all ${
            isFinished ? "bg-green-600 text-white hover:bg-green-700" : ""
          } btn btn-outline`}
        >
          Переглянути <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Link>
  );
};

export default MaterialCardLarge;
