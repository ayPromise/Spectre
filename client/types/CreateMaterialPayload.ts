import { MaterialType, Specification, Test } from "@shared/types";

interface CreateArticlePayload {
  kind: MaterialType.Article;
  title: string;
  content: string;
  type: Specification;
  test: Test;
}

interface UpdateArticlePayload {
  kind: MaterialType.Article;
  title?: string;
  content?: string;
  type?: Specification;
  test?: Test;
}

interface CreateLecturePayload {
  kind: MaterialType.Lecture;
  title: string;
  description: string;
  videoURL: string;
  time: number;
  type: Specification;
  test: Test;
}

interface UpdateLecturePayload {
  kind: MaterialType.Lecture;
  title?: string;
  description?: string;
  videoUrl?: string;
  time: number;
  type?: Specification;
  test?: Test;
}

interface CreateVideoPayload {
  kind: MaterialType.Video;
  title: string;
  videoUrl: string;
  time: number;
  type: Specification;
  test: Test;
}

interface UpdateVideoPayload {
  kind: MaterialType.Video;
  title?: string;
  videoUrl?: string;
  time?: number;
  type?: Specification;
  test?: Test;
}

export type {
  CreateArticlePayload,
  UpdateArticlePayload,
  CreateLecturePayload,
  UpdateLecturePayload,
  CreateVideoPayload,
  UpdateVideoPayload,
};
