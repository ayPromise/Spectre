"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useMaterials } from "@/context/MaterialsContext";
import MaterialsList from "./components/MaterialsList";

const MaterialsPage = () => {
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

  return <MaterialsList materials={materials || []} />;
};

export default MaterialsPage;
