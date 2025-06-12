"use client";

import { useEffect, useState } from "react";
import { MaterialType, MaterialTypeNameUA } from "@shared/types/Enums";

// UTILS
import { showError, showSuccess } from "@/utils/toast";
import deleteMaterial from "../../utils/deleteMaterial";

// TYPES

// COMPONENTS
import { Button } from "@/components/ui/button";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";
import ArticleView from "./components/ArticleView";
import LectureView from "./components/LectureView";
import TestView from "./components/TestView";
import FinishedLabel from "@/components/custom/FinishedLabel";
import VideoView from "./components/VideoView";

// HOOKS
import { useAccess } from "@/hooks/useAccess";
import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useMaterials } from "@/context/MaterialsContext";
import isMaterialFinished from "./utils/isMaterialFinished";
import Link from "next/link";
import Head from "next/head";

const MaterialPage = () => {
  const params = useParams();
  const kind = String(params.kind);
  const id = String(params.id);
  const { hasAdminAccess, hasInstructorAccess } = useAccess();
  const { materials, isLoading, isError, error, refetch } = useMaterials();
  const materialById = materials.find((m) => m._id === id);
  const router = useRouter();
  const { userData } = useAuth();

  const [hasRefetched, setHasRefetched] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !materialById && !hasRefetched) {
      setHasRefetched(true);
      refetch();
    } else if (!isLoading && isError && !materialById && hasRefetched) {
      showError("Матеріал не знайдено");
      router.replace(`/materials/${kind}`);
    }
  }, [isLoading, materialById, kind, router, refetch, hasRefetched, isError]);

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

  const isFinished = isMaterialFinished(
    userData,
    materialById.kind,
    materialById._id
  );

  return (
    <>
      <Head>
        <title>{materialById.title} | SPECTRE</title>
        <meta
          name="description"
          content={`Перегляд матеріалу "${materialById.title}"...`}
        />
      </Head>
      <div className="container space-y-8">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-3xl font-bold">{materialById.title}</h1>
              {isFinished && <FinishedLabel />}
            </div>
            <p className="text-sm text-muted-foreground">
              Створено: {new Date(materialById.createdAt).toLocaleDateString()}
            </p>
          </div>

          {(hasInstructorAccess || hasAdminAccess) && (
            <div className="flex gap-3">
              <Link
                href={`/materials/${materialById.kind.toLocaleLowerCase()}/${
                  materialById._id
                }/edit`}
              >
                <Button variant="default" onClick={() => {}}>
                  Редагувати
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isRemoving}
              >
                Видалити матеріал
              </Button>
            </div>
          )}
        </div>

        {materialById.kind === MaterialType.Article && (
          <ArticleView article={materialById} />
        )}
        {materialById.kind === MaterialType.Lecture && (
          <LectureView lecture={materialById} />
        )}
        {materialById.kind === MaterialType.Video && (
          <VideoView video={materialById} />
        )}

        {(materialById.kind === MaterialType.Article ||
          materialById.kind === MaterialType.Lecture) && (
          <TestView test={materialById.test} material={materialById} />
        )}
      </div>
    </>
  );
};

export default MaterialPage;
