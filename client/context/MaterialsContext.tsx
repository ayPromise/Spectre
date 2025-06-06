"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import getMaterials from "@/app/materials/create/utils/getAllMaterials";

interface Material {
  _id: string;
  kind: string;
  title: string;
  type: string;
  description?: string;
  content?: string;
}

interface MaterialsContextValue {
  materials: Material[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

const MaterialsContext = createContext<MaterialsContextValue | undefined>(
  undefined
);

export const MaterialsProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: materials,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Material[]>({
    queryKey: ["materials"],
    queryFn: getMaterials,
    staleTime: 1000 * 60 * 5, // кеш 5 хвилин
  });

  return (
    <MaterialsContext.Provider
      value={{ materials, isLoading, isError, error, refetch }}
    >
      {children}
    </MaterialsContext.Provider>
  );
};

export const useMaterials = () => {
  const context = useContext(MaterialsContext);
  if (!context) {
    throw new Error("useMaterials must be used within a MaterialsProvider");
  }
  return context;
};
