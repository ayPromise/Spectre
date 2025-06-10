import server_endpoints from "@/app/api/server_endpoints";
import {
  CreateArticlePayload,
  CreateLecturePayload,
} from "@/types/CreateMaterialPayload";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const createMaterial = async (
  data: CreateArticlePayload | CreateLecturePayload
) => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.materials}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "Не вдалося створити навчальний матеріал"
    );
  }

  return response.json();
};

export default createMaterial;
