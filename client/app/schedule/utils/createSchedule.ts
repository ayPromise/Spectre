import server_endpoints from "@/app/api/server_endpoints";
import { CreateSchedulePayload } from "@/types/SchedulePayloads";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const createSchedule = async (data: CreateSchedulePayload) => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.schedule}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Щось пішло не так");
  }

  return response.json();
};

export default createSchedule