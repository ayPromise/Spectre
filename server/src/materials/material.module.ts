import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { Material, MaterialSchema } from './schema/material.schema';
import { ArticleMaterialSchema } from './schema/article.schema';
import { LectureMaterialSchema } from './schema/lecture.schema';
import { VideoMaterialSchema } from './schema/video.schema';
import { MaterialType } from '@shared/types';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Material.name,
        useFactory: () => {
          const schema = MaterialSchema;
          schema.discriminator(MaterialType.Article, ArticleMaterialSchema);
          schema.discriminator(MaterialType.Lecture, LectureMaterialSchema);
          schema.discriminator(MaterialType.Video, VideoMaterialSchema);
          return schema;
        },
      },
    ]),
  ],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
