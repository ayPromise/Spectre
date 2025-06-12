import { ID } from ".";
import { FlightType } from "./Enums";

export interface MapPoint {
  coordX: number;
  coordY: number;
  coordZ: number;
  comment?: string;
}

export interface Flight {
  _id: ID;
  title: string;
  filePath: string;
  flightType: FlightType;
  mapPoints: MapPoint[];
  date: string;
  userId: string;
}
