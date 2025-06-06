import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Material, Test } from './material.schema';

@Schema()
export class VideoMaterial extends Material {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  videoURL: string;

  @Prop({ required: true })
  time: number;

  @Prop({ type: Test })
  test: Test;
}

export const VideoMaterialSchema = SchemaFactory.createForClass(VideoMaterial);
