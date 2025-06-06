import { ID } from ".";
import { FlightType } from "./Enums";

export interface MapPoint {
  coordX: number;
  coordY: number;
  coordZ: number;
  comment?: string;
}

export interface ArchiveLog {
  _id: ID;
  title: string;
  description: string;
  userId: ID;
  date: Date;
  flightType: FlightType;
  mapPoints: MapPoint[];
  createdAt: Date;
  updatedAt: Date;
}
