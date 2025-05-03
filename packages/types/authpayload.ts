import { IUserClient } from "./user";

export interface AuthPayload {
  token: string;
  user: IUserClient;
}