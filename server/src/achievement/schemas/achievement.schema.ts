import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Achievement {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  requiredMaterialIds: string[];

  @Prop({ required: true })
  category: string;
}

export type AchievementDocument = Achievement & Document;
export const AchievementSchema = SchemaFactory.createForClass(Achievement);
