import server_endpoints from "@/app/api/server_endpoints";
import { Achievement } from "@shared/types";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export interface RequiredMaterialRef {
  id: string;
  kind: string;
}

const saveAchievement = async (data: Partial<Achievement>, id?: string) => {
  const url = id
    ? `${SERVER_URL}${server_endpoints.achievements}/${id}`
    : `${SERVER_URL}${server_endpoints.achievements}`;
  const method = id ? "PATCH" : "POST";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const err = (await res.json())?.error;
    throw new Error(
      err || `Не вдалося ${id ? "оновити" : "створити"} досягнення`
    );
  }

  return res.json();
};

export default saveAchievement;
