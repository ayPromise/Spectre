import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const completeArticle = async (
  articleId: string,
  userId: string | undefined
) => {
  if (!userId) return;

  const response = await fetch(SERVER_URL + server_endpoints.completeArticle, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ articleId, userId }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to complete video");
  }
  return response.json();
};

export default completeArticle;
