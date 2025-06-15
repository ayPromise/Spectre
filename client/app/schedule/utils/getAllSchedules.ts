import server_endpoints from "@/app/api/server_endpoints";
import { Schedule } from "@shared/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const getAllSchedules = async (): Promise<Schedule[]> => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.schedule}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "Не вдалося отримати записи для розкладу"
    );
  }
  return response.json();
};

export default getAllSchedules;
