"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loader from "@/components/custom/Loader";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { getFiles } from "./utils/getFiles";
import { deleteFile } from "./utils/deleteFile";
import { showError, showSuccess } from "@/utils/toast";
import CreateFileDialog from "./components/CreateFileDialog";
import LibraryTable from "./components/LibraryTable";
import NotFoundMessage from "@/components/custom/NotFoundMessage";

const LibraryPage = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["files"],
    queryFn: getFiles,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      showSuccess("Файл видалено");
      refetch();
    },
    onError: (err: Error) => showError(err.message),
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <CreateFileDialog refetch={refetch} />
      </div>

      {isLoading && <Loader />}
      {isError && <ErrorMessage>{(error as Error).message}</ErrorMessage>}

      {data?.length ? (
        <LibraryTable files={data} onDelete={handleDelete} />
      ) : (
        <NotFoundMessage>Файли не знайдено</NotFoundMessage>
      )}
    </div>
  );
};

export default LibraryPage;
