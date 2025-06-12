import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { FlightType } from '@shared/types';

export type FlightDocument = HydratedDocument<Flight>;

@Schema({ timestamps: true })
export class Flight {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: FlightType })
  flightType: FlightType;

  @Prop({
    type: [
      {
        coordX: Number,
        coordY: Number,
        coordZ: Number,
        comment: { type: String, required: false },
      },
    ],
    default: [],
  })
  mapPoints: any[];

  @Prop({ required: true })
  filePath: string;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
