import server_endpoints from "@/app/api/server_endpoints";
import { User } from "@shared/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function editUser(
  userId: string,
  data: Partial<User>
): Promise<User> {
  const res = await fetch(
    `${SERVER_URL}${server_endpoints.editUser}/${userId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Не вдалося оновити користувача");
  }

  return res.json();
}
