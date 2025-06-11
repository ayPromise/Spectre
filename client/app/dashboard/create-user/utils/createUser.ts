import server_endpoints from "@/app/api/server_endpoints";
import { CreateUserPayload } from "@/types/UserPayloads";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const createUser = async (data: CreateUserPayload) => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.createUser}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Щось пішло не так");
  }

  return response.json();
};

export default createUser;
