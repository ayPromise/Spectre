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
            return (
              <Link href={`/materials/${kind}/${id}`} key={id || index}>
                <div className="flex flex-col items-start gap-4 rounded-2xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      {iconByKind[item.kind] || <FileText />}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {MaterialTypeNameUA[item.kind]}
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="ml-auto">
                    Переглянути <ArrowRight className="h-4 w-4" />
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
