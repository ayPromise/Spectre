import { MaterialType } from '@shared/types';
import { CreateArticleDto } from './create-article.dto';
import { CreateLectureDto } from './create-lecture.dto';
import { CreateVideoDto } from './create-video.dto';

type StripKind<T> = Omit<T, 'kind'>;

export type CreateMaterialDto = StripKind<CreateArticleDto> &
  StripKind<CreateLectureDto> &
  StripKind<CreateVideoDto> & {
    kind: MaterialType;
  };
