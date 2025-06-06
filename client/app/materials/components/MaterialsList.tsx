"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, FileText, Video } from "lucide-react";
import Link from "next/link";

const iconByKind = {
  article: <FileText />,
  video: <Video />,
  lecture: <BookOpen />,
};

interface Material {
  _id: string;
  kind: string;
  title: string;
  type: string;
  description?: string;
  content?: string;
}

interface MaterialsListProps {
  materials: Material[];
}

const MaterialsList: React.FC<MaterialsListProps> = ({ materials }) => {
  return (
    <div className="flex flex-col gap-6">
      {materials.map((item, index) => {
        const kind = item.kind.toLowerCase();
        const id = item._id;
        return (
          <Link href={`/materials/${kind}/${id}`} key={id || index}>
            <div className="flex flex-col items-start gap-4 rounded-2xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {iconByKind[kind] || <FileText />}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.type}</p>
                </div>
              </div>

              <p className="text-base font-medium text-muted-foreground md:flex-1 md:px-4">
                {item.description || item.content || "Опис відсутній"}
              </p>

              <Button variant="outline" className="ml-auto">
                Переглянути <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MaterialsList;
