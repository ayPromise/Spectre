"use client";

import { useParams } from "next/navigation";
import { MaterialType } from "@shared/types/Enums";
import { useMaterials } from "@/context/MaterialsContext";
import { useEffect } from "react";
import { showError } from "@/utils/toast";
import { useRouter } from "next/navigation";
import ArticleForm from "@/app/materials/components/ArticleForm";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";
import LectureForm from "@/app/materials/components/LectureForm";
import VideoForm from "@/app/materials/components/VideoForm";

const MaterialEditPage = () => {
  const params = useParams();
  const kind = String(params.kind);
  const id = String(params.id);
  const router = useRouter();
  const { materials, isLoading, isError, error } = useMaterials();
  const materialById = materials.find((m) => m._id === id);

  useEffect(() => {
    if (!isLoading && !materialById) {
      showError("Матеріал не знайдено");
      router.replace(`/materials/${kind}`);
    }
  }, [isLoading, materialById, kind, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage>Помилка: {(error as Error).message}</ErrorMessage>;
  }

  if (!materialById) return null;

  const materialType = materialById.kind;

  if (materialType === MaterialType.Article) {
    return <ArticleForm initialData={materialById} />;
  }

  if (materialType === MaterialType.Lecture) {
    return <LectureForm initialData={materialById} />;
  }

  if (materialType === MaterialType.Video) {
    return <VideoForm initialData={materialById} />;
  }

  return <div>Непідтримуваний тип</div>;
};

export default MaterialEditPage;
