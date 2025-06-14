import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const deleteFile = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(
    `${SERVER_URL}${server_endpoints.library}/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Помилка при видаленню файлу");
  }

  return response.json();
};
