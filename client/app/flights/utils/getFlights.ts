import server_endpoints from "@/app/api/server_endpoints";
import { Flight } from "@shared/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getFlights = async (): Promise<Flight[]> => {
  const response = await fetch(`${SERVER_URL}${server_endpoints.flights}`, {
    cache: "no-store",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Не вдалося отримати список польотів");
  }

  return response.json();
};
