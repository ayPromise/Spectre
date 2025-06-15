import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const me = async (cookieHeader?: string) => {
  console.log(
    `Fetching /auth/me with method: GET, cookieHeader: ${
      cookieHeader || "none"
    }`
  );
  const res = await fetch(`${SERVER_URL}${server_endpoints.me}`, {
    method: "GET",
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    credentials: "include",
  });
  console.log(`Response from /auth/me: status ${res.status}, ok: ${res.ok}`);
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Error from /auth/me: ${errorText}`);
    throw new Error("Not authenticated");
  }
  return res.json();
};

export default me;
