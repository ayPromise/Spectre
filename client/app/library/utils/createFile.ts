import server_endpoints from "@/app/api/server_endpoints";
import { File as SharedFile } from "@shared/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const createFile = async (file: File): Promise<SharedFile> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${SERVER_URL}${server_endpoints.library}`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Не вдалося завантажити файл");
  }

  return response.json();
};
