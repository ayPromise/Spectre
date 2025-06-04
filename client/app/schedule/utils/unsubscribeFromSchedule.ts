import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default async function unsubscribeFromSchedule(scheduleId: string, userId: string) {
    const res = await fetch(`${SERVER_URL}${server_endpoints.schedule}/unsubscribe/${scheduleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
      credentials:"include"
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Виникла помилка при відписці");
    }
  
    return await res.json();
  }
  