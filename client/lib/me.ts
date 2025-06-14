import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const me = async (cookieHeader?: string) => {
  const res = await fetch(`${SERVER_URL}${server_endpoints.me}`, {
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    credentials: "include",
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

export default me;
