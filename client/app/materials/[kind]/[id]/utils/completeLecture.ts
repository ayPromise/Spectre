import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const completeLecture = async (
  lectureId: string,
  userId: string | undefined
) => {
  if (!userId) return;

  const response = await fetch(SERVER_URL + server_endpoints.completeLecture, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lectureId, userId }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to complete video");
  }
  return response.json();
};

export default completeLecture;
