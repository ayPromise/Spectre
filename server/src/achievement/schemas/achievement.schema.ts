import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MaterialType } from '@shared/types';
import { Document } from 'mongoose';

@Schema()
class RequiredMaterial {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, enum: MaterialType })
  kind: MaterialType;
}

const RequiredMaterialSchema = SchemaFactory.createForClass(RequiredMaterial);

@Schema({ timestamps: true })
export class Achievement {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [RequiredMaterialSchema], default: [] })
  requiredMaterials: RequiredMaterial[];

  @Prop({ required: true })
  category: string;
}

export type AchievementDocument = Achievement & Document;
export const AchievementSchema = SchemaFactory.createForClass(Achievement);
