"use client";

import React from "react";
import { useMaterials } from "@/context/MaterialsContext";
import { Loader2 } from "lucide-react";
import MaterialsList from "../components/MaterialsList";

interface MaterialsTypePageProps {
  params: {
    kind: string;
  };
}

const MaterialsTypePage: React.FC<MaterialsTypePageProps> = ({ params }) => {
  const { kind } = params;
  const { materials, isLoading, isError, error } = useMaterials();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-600">
        Помилка: {(error as Error).message}
      </div>
    );
  }

  const filteredMaterials = materials?.filter(
    (m) => m.kind.toLowerCase() === kind.toLowerCase()
  );

  if (!filteredMaterials || filteredMaterials.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Немає матеріалів типу {kind}
      </div>
    );
  }

  return <MaterialsList materials={filteredMaterials} />;
};

export default MaterialsTypePage;
