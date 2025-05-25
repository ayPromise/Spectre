import { MaterialType, Test } from "@shared/types";

interface CreateArticlePayload {
  title: string;
  content: string;
  type: MaterialType;
  test: Test;
}

interface UpdateArticlePayload {
  title?: string;
  content?: string;
  type?: MaterialType;
  test?: Test;
}

export type { CreateArticlePayload, UpdateArticlePayload }