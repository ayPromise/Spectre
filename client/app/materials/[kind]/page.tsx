"use client";

import React, { useEffect } from "react";
import { useMaterials } from "@/context/MaterialsContext";
import { useParams, useRouter } from "next/navigation";
import { MaterialType, MaterialTypeNameUA } from "@shared/types/Enums";
import { showError } from "@/utils/toast";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";
import MaterialsList from "../components/MaterialsList";
import NotFoundMessage from "@/components/custom/NotFoundMessage";

const normalizeKind = (k: string): string =>
  k.charAt(0).toUpperCase() + k.slice(1).toLowerCase();

const MaterialsTypePage = () => {
  const params = useParams();
  const kind = String(params.kind);
  const router = useRouter();
  const { materials, isLoading, isError, error } = useMaterials();

  useEffect(() => {
    const isValidKind = Object.values(MaterialType).includes(
      normalizeKind(kind) as MaterialType
    );

    if (!isValidKind) {
      router.push("/materials");
      showError(`Invalid kind: ${kind}`);
    }
  }, [kind, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage>Помилка: {(error as Error).message}</ErrorMessage>;
  }

  const filteredMaterials = materials?.filter(
    (m) => m.kind.toLowerCase() === kind.toLowerCase()
  );

  if (!filteredMaterials || filteredMaterials.length === 0) {
    return (
      <NotFoundMessage>
        Немає матеріалів типу{" "}
        {MaterialTypeNameUA[normalizeKind(kind) as MaterialType]}
      </NotFoundMessage>
    );
  }

  return <MaterialsList materials={filteredMaterials} />;
};

export default MaterialsTypePage;
