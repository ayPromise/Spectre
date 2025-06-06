import server_endpoints from "@/app/api/server_endpoints";
import { CreateMaterialPayload } from "@/types/CreateMaterialPayload";
import { MaterialType } from "@shared/types/Enums";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const createMaterial = async (data: CreateMaterialPayload) => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.materials}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ ...data, variant: MaterialType.Article }),
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
