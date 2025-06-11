import { User } from "@shared/types";
import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getAllUsers(): Promise<User[]> {
  const res = await fetch(`${SERVER_URL}${server_endpoints.users}`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Не вдалося отримати користувачів");
  }

  return res.json();
}
