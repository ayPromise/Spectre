import { Specification } from "@shared/types";

interface CreateVideoPayload {
  title: string;
  description: string;
  videoURL: string;
  type: Specification;
}

interface UpdateVideoPayload {
  title?: string;
  description?: string;
  videoURL?: string;
  type?: Specification;
}

export type { CreateVideoPayload, UpdateVideoPayload };
