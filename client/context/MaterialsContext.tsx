"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getMaterials from "@/app/materials/utils/getAllMaterials";
import { MaterialUnion } from "@shared/types";
import { useAuth } from "./AuthContext";

interface MaterialsContextValue {
  materials: MaterialUnion[] | [];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

const MaterialsContext = createContext<MaterialsContextValue>({
  materials: [],
  isLoading: false,
  isError: false,
  error: null,
  refetch: () => {},
});

export const MaterialsProvider = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAuth();
  const {
    data: materials,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<MaterialUnion[]>({
    queryKey: ["materials"],
    queryFn: getMaterials,
    staleTime: 1000 * 60 * 5,
    enabled: false,
  });

  useEffect(() => {
    if (isAuth) {
      refetch();
    }
  }, [isAuth, refetch]);

  return (
    <MaterialsContext.Provider
      value={{ materials: materials || [], isLoading, isError, error, refetch }}
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
