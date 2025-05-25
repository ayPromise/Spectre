import { FlightType, MapPoint } from "@shared/types";

interface CreateArchiveLogPayload {
  title: string;
  description: string;
  date: Date;
  flightType: FlightType;
  mapPoints: MapPoint[];
}

interface UpdateArchiveLogPayload {
  title?: string;
  description?: string;
  date?: Date;
  flightType?: FlightType;
  mapPoints?: MapPoint[];
}

  export type { CreateArchiveLogPayload, UpdateArchiveLogPayload }