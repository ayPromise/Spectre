import { Achievement } from "@shared/types";
import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAchievements(): Promise<Achievement[]> {
  console.log("YEAH");
  const res = await fetch(SERVER_URL + server_endpoints.achievements, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Не вдалося отримати досягнення");
  }

  return res.json();
}
