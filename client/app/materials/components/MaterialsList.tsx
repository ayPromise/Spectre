"use client";

import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { MaterialUnion } from "@shared/types";
import useDebounce from "@/hooks/useDebounce";
import NotFoundMessage from "@/components/custom/NotFoundMessage";
import MaterialCardLarge from "./MaterialCardLarge";

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
          filteredMaterials.map((item) => (
            <MaterialCardLarge key={item._id} material={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default MaterialsList;
