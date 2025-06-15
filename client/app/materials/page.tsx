"use client";

import React, { useEffect } from "react";
import { useMaterials } from "@/context/MaterialsContext";
import MaterialsList from "./components/MaterialsList";
import NotFoundMessage from "@/components/custom/NotFoundMessage";
import ErrorMessage from "@/components/custom/ErrorMessage";
import Loader from "@/components/custom/Loader";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
const MaterialsPage = () => {
  const { materials, isLoading, isError, error } = useMaterials();
  const { isAuth, userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth || !userData) {
      router.push("/sign-in");
    }
  }, [isAuth, userData, router]);

  if (!isAuth || !userData) {
    return null;
  }

  if (isLoading || !materials.length) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage>Помилка: {(error as Error).message}</ErrorMessage>;
  }

  if (!materials || materials.length === 0) {
    return <NotFoundMessage>Немає матеріалів</NotFoundMessage>;
  }

  return <MaterialsList materials={materials} listType={"all"} />;
};

export default MaterialsPage;
