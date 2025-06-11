import server_endpoints from "@/app/api/server_endpoints";
import { CreateUserPayload } from "@/types/UserPayloads";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const createUser = async (data: CreateUserPayload) => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.createUser}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export default createUser;
