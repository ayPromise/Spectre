import server_endpoints from "@/app/api/server_endpoints";
import AuthStatus from "@/types/client/AuthStatus";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function assignAchievements(params: {
  userId: string;
  achievements: string[];
}): Promise<{ access_token: string; user: AuthStatus }> {
  const res = await fetch(SERVER_URL + server_endpoints.assignAchievements, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error("Не вдалося присвоїти досягнення");
  }

  return res.json();
}
