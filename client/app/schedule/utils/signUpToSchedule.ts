import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const signUpToSchedule = async (id: string, userId: string) => {
    const response = await fetch(`${SERVER_URL}${server_endpoints.schedule}/sign-up/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        newUserId: userId,
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Не вдалося записатися на заняття");
    }
  
    return response.json();
  };
  
  export default signUpToSchedule;
  