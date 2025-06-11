import server_endpoints from "@/app/api/server_endpoints";
import { MaterialType } from "@shared/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const endpointMap = {
  [MaterialType.Article]: server_endpoints.completeArticle,
  [MaterialType.Lecture]: server_endpoints.completeLecture,
  [MaterialType.Video]: server_endpoints.completeVideo,
} as const;

const completeMaterial = async (
  type: MaterialType,
  materialId: string,
  userId: string | undefined
) => {
  if (!userId) return;

  const bodyKey = `${type.toLocaleLowerCase()}Id`;
  const endpoint = endpointMap[type];

  const response = await fetch(SERVER_URL + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [bodyKey]: materialId, userId }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to complete ${type}`);
  }

  return response.json();
};

export default completeMaterial;
