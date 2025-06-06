import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Material, Question, Test } from './material.schema';
import { Prop } from '@nestjs/mongoose';

@Schema()
export class ArticleMaterial extends Material {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Test })
  test: Test;
}

export const ArticleMaterialSchema =
  SchemaFactory.createForClass(ArticleMaterial);
