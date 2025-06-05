import server_endpoints from "@/app/api/server_endpoints";
import { UpdateSchedulePayload } from "@/types/SchedulePayloads";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const updateSchedule = async (
  id: string,
  data: Partial<UpdateSchedulePayload>
) => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.schedule}/${id}`, {
    method: "PUT",
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

export default updateSchedule;
