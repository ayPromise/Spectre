import server_endpoints from "@/app/api/server_endpoints";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const deleteSchedule = async (id: string) => {
    const response = await fetch(`${SERVER_URL}${server_endpoints.schedule}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Не вдалося видалити розклад");
    }
  
    return true;
  };
  
  export default deleteSchedule;
  