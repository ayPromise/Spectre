import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const me = async () => {
  const res = await fetch(`${SERVER_URL}${server_endpoints.me}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Error from /auth/me: ${errorText}`);
    throw new Error("Not authenticated");
  }
  return res.json();
};

export default me;
