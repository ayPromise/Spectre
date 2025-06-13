import server_endpoints from "@/app/api/server_endpoints";
import { File as SharedFile } from "@shared/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getFiles = async (): Promise<SharedFile[]> => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.library}`, {
    cache: "no-store",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Не вдалося отримати список файлів");
  }

  return response.json();
};
