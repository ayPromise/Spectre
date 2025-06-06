import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MaterialDocument = HydratedDocument<Material>;

@Schema()
export class Option {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  isCorrect: boolean;
}

@Schema()
export class Question {
  @Prop({ required: true })
  text: string;

  @Prop({ type: [Option], required: true })
  options: Option[];

  @Prop({ default: false })
  multipleAnswers: boolean;

  @Prop({ default: 1 })
  points: number;
}

@Schema()
export class Test {
  @Prop({ type: [Question], default: [] })
  questions: Question[];

  @Prop({ required: true })
  summaryScore: number;
}

@Schema({ discriminatorKey: 'kind', timestamps: true })
export class Material {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
