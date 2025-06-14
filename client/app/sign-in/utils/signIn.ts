import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const signIn = async (data: { email: string; password: string }) => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.singIn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Помилка входу");
  }

  return response.json();
};

export default signIn;
