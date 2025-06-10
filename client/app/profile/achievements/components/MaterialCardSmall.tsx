"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Video } from "lucide-react";
import { MaterialType, MaterialUnion } from "@shared/types";
import { MaterialTypeNameUA } from "@shared/types/Enums";
import isMaterialFinished from "@/app/materials/[kind]/[id]/utils/isMaterialFinished";
import { useAuth } from "@/context/AuthContext";

interface MaterialCardSmallProps {
  material: MaterialUnion;
}

const iconByKind: Record<MaterialType, React.ReactNode> = {
  [MaterialType.Article]: <FileText />,
  [MaterialType.Video]: <Video />,
  [MaterialType.Lecture]: <BookOpen />,
};

const MaterialCardSmall: React.FC<MaterialCardSmallProps> = ({ material }) => {
  const { userData } = useAuth();
  const kind = material.kind.toLowerCase();
  const id = material._id;
  const isFinished = isMaterialFinished(userData, material.kind, material._id);

  return (
    <Link href={`/materials/${kind}/${id}`} key={id}>
      <div
        className={`
          flex items-center gap-3 rounded-lg border p-3 transition
          ${
            isFinished
              ? "bg-green-50 border-green-200 shadow hover:shadow-md"
              : "bg-background border-gray-200 hover:bg-muted"
          }
        `}
      >
        <div
          className={`
            flex h-10 w-10 items-center justify-center rounded-md
            ${
              isFinished
                ? "bg-green-100 text-green-600"
                : "bg-muted text-muted-foreground"
            }
          `}
        >
          {iconByKind[material.kind] || <FileText />}
        </div>

        <div className="flex-1">
          <h4
            className={`text-sm font-medium line-clamp-1 ${
              isFinished ? "text-green-700" : ""
            }`}
          >
            {material.title}
          </h4>
          <p className="text-xs text-muted-foreground">
            {MaterialTypeNameUA[material.kind]}
          </p>
        </div>

        <ArrowRight
          className={`h-4 w-4 shrink-0 ${
            isFinished ? "text-green-600" : "text-muted-foreground"
          }`}
        />
      </div>
    </Link>
  );
};

export default MaterialCardSmall;
