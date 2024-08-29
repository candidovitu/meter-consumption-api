import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MeasureType = 'WATER' | 'GAS';

@Schema({
  versionKey: false,
})
export class Measure {
  @Prop()
  id: string;

  @Prop()
  customerCode: string;

  @Prop()
  imageFileName: string;

  @Prop()
  value: number;

  @Prop()
  date: Date;

  @Prop()
  type: MeasureType;

  @Prop()
  confirmed: boolean;
}

export const MeasureSchema = SchemaFactory.createForClass(Measure);
