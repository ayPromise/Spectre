const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const completeVideo = async (videoId: string, userId: string | undefined) => {
  if (!userId) return;

  const response = await fetch(SERVER_URL + "/auth/complete-video", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ videoId, userId }),
    credentials: "include",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to complete video");
  }
  return response.json();
};

export default completeVideo;
