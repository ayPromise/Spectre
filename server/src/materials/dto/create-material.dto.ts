import { CreateArticleDto } from './create-article.dto';
import { CreateLectureDto } from './create-lecture.dto';
import { CreateVideoDto } from './create-video.dto';

export type CreateMaterialDto =
  | CreateArticleDto
  | CreateLectureDto
  | CreateVideoDto;
