import { Specification, Test } from "@shared/types";

interface CreateArticlePayload {
  title: string;
  content: string;
  type: Specification;
  test: Test;
}

interface UpdateArticlePayload {
  title?: string;
  content?: string;
  type?: Specification;
  test?: Test;
}

export type { CreateArticlePayload, UpdateArticlePayload };
