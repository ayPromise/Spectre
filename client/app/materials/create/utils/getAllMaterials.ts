import server_endpoints from "@/app/api/server_endpoints";
import { MaterialUnion } from "@shared/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const getMaterials = async (): Promise<MaterialUnion[]> => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.materials}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Не вдалося отримати матеріали");
  }

  return response.json();
};

export default getMaterials;
