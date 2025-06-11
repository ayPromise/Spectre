import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function deleteUser(userId: string): Promise<void> {
  const res = await fetch(
    `${SERVER_URL}${server_endpoints.deleteUser}/${userId}`,
    {
      method: "DELETE",
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Не вдалося видалити користувача");
  }
}
