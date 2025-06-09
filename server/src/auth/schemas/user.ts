import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole, ID } from '@shared/types';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, default: 'placeholder' })
  avatarURL: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.Student })
  role: UserRole;

  @Prop({ type: [Types.ObjectId], default: [], ref: 'Article' })
  completedArticles: ID[];

  @Prop({ type: [Types.ObjectId], default: [], ref: 'Video' })
  completedVideos: ID[];

  @Prop({ type: [Types.ObjectId], default: [], ref: 'Lecture' })
  completedLectures: ID[];

  @Prop({ type: [Types.ObjectId], default: [], ref: 'Certificate' })
  certificates: ID[];

  @Prop({ type: [Types.ObjectId], default: [], ref: 'Achievement' })
  achievements: ID[];

  @Prop({ default: Date.now })
  lastLogin: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
