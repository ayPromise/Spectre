import { MaterialType } from "@shared/types";

interface CreateVideoPayload {
  title: string;
  description: string;
  videoURL: string;
  type: MaterialType;
}

interface UpdateVideoPayload {
  title?: string;
  description?: string;
  videoURL?: string;
  type?: MaterialType;
}
  
export type { CreateVideoPayload, UpdateVideoPayload }
  