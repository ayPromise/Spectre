import { MaterialType, Test } from "@shared/types";

interface CreateArticlePayload {
  kind: MaterialType.Article;
  title: string;
  content: string;
  course: string;
  test: Test;
}

interface UpdateArticlePayload {
  kind: MaterialType.Article;
  title?: string;
  content?: string;
  course?: string;
  test?: Test;
}

interface CreateLecturePayload {
  kind: MaterialType.Lecture;
  title: string;
  description: string;
  videoURL: string;
  time: number;
  course: string;
  test: Test;
}

interface UpdateLecturePayload {
  kind: MaterialType.Lecture;
  title?: string;
  description?: string;
  videoURL?: string;
  time: number;
  course?: string;
  test?: Test;
}

interface CreateVideoPayload {
  kind: MaterialType.Video;
  title: string;
  videoURL: string;
  time: number;
  course: string;
}

interface UpdateVideoPayload {
  kind: MaterialType.Video;
  title?: string;
  videoURL?: string;
  time?: number;
  course?: string;
}

export type {
  CreateArticlePayload,
  UpdateArticlePayload,
  CreateLecturePayload,
  UpdateLecturePayload,
  CreateVideoPayload,
  UpdateVideoPayload,
};
