import { Achievement } from "@shared/types";
import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function deleteAchievement(
  achievementId: string
): Promise<Achievement[]> {
  const res = await fetch(
    `${SERVER_URL}${server_endpoints.achievements}/${achievementId}`,
    {
      method: "DELETE",
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Не вдалося видалити досягнення");
  }

  return res.json();
}
