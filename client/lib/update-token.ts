import server_endpoints from "@/app/api/server_endpoints";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const updateToken = async (token: string) => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.updateToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ token }),
  });

  return response.json();
};

export default updateToken;
