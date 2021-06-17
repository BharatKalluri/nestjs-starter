import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  _id!: Types.ObjectId;

  @Prop({ required: false })
  createdAt?: Date;

  @Prop({ required: false })
  updatedAt?: Date;

  @Prop({ required: false })
  email?: string;

  @Prop({ required: false })
  phoneNumber?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
