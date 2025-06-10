import server_endpoints from "@/app/api/server_endpoints";
import {
  CreateArticlePayload,
  CreateLecturePayload,
  CreateVideoPayload,
} from "@/types/CreateMaterialPayload";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const saveMaterial = async (
  data: CreateArticlePayload | CreateLecturePayload | CreateVideoPayload,
  id?: string
) => {
  const url = id
    ? `${SERVER_URL}${server_endpoints.materials}/${id}`
    : `${SERVER_URL}${server_endpoints.materials}`;

  const method = id ? "PATCH" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error ||
        `Не вдалося ${id ? "оновити" : "створити"} навчальний матеріал`
    );
  }

  return response.json();
};

export default saveMaterial;
