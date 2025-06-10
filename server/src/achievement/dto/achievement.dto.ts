import { IsString, ValidateNested, IsArray, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { MaterialType } from '@shared/types';

class RequiredMaterialDto {
  @IsString()
  _id: string;

  @IsEnum(MaterialType)
  kind: MaterialType;
}

export class CreateAchievementDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequiredMaterialDto)
  requiredMaterials: RequiredMaterialDto[];
}
