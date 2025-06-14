import server_endpoints from "@/app/api/server_endpoints";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const signOut = async () => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.signOut}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to sign out");
  }

  return response.json();
};

export default signOut;
