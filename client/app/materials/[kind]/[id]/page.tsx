"use client";

import { Button } from "@/components/ui/button";
import { useMaterials } from "@/context/MaterialsContext";
import { MaterialType, MaterialTypeNameUA } from "@shared/types/Enums";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import deleteMaterial from "../../create/utils/deleteMaterial";
import { showError, showSuccess } from "@/utils/toast";
import { useEffect } from "react";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";
import ArticleView from "./components/ArticleView";
import LectureView from "./components/LectureView";
import VideoView from "./components/VideoView";
import { useAccess } from "@/hooks/useAccess";
import TestView from "./components/TestView";

const MaterialPage = () => {
  const params = useParams();
  const kind = String(params.kind);
  const id = String(params.id);
  const { hasAdminAccess, hasInstructorAccess } = useAccess();
  const { materials, isLoading, isError, error, refetch } = useMaterials();
  const materialById = materials.find((m) => m._id === id);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !materialById) {
      showError("Матеріал не знайдено");
      router.replace(`/materials/${kind}`);
    }
  }, [isLoading, materialById, kind, router]);

  const { mutate: removeMaterialMutation, isPending: isRemoving } = useMutation(
    {
      mutationFn: () => deleteMaterial(id),
      onError: (error: Error) => {
        showError(error.message || "Не вдалося видалити матеріал");
      },
    }
  );

  const handleDelete = () => {
    if (!materialById) return;

    removeMaterialMutation(undefined, {
      onSuccess: () => {
        showSuccess(
          `${MaterialTypeNameUA[materialById.kind]} була успішно видалена 🎉`
        );
        router.push(`/materials/${kind}`);
        refetch();
      },
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage>Помилка: {(error as Error).message}</ErrorMessage>;
  }

  if (!materialById) return null;

  return (
    <div className="container space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{materialById.title}</h1>
        <p className="text-sm text-muted-foreground">
          Створено: {new Date(materialById.createdAt).toLocaleDateString()}
        </p>
      </div>

      {(hasInstructorAccess || hasAdminAccess) && (
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isRemoving}
        >
          Видалити матеріал
        </Button>
      )}

      {materialById.kind === MaterialType.Article && (
        <ArticleView article={materialById} />
      )}
      {materialById.kind === MaterialType.Lecture && (
        <LectureView lecture={materialById} />
      )}
      {materialById.kind === MaterialType.Video && (
        <VideoView video={materialById} />
      )}

      {materialById.test?.questions?.length > 0 && (
        <TestView test={materialById.test} />
      )}
    </div>
  );
};

export default MaterialPage;
