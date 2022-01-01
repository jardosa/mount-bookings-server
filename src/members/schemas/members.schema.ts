import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemberDocument = Member & Document;

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema({ timestamps: true, autoIndex: true })
export class Member {
  @Field()
  @Prop()
  firstName: string;

  @Field()
  @Prop()
  lastName: string;

  @Field()
  @Prop()
  phoneNumber: string;

  @Field()
  @Prop()
  email: string;

  @Field({ nullable: true })
  @Prop()
  emergencyContactName?: string;

  @Field({ nullable: true })
  @Prop()
  emergencyContactNumber?: string;

  @Field({ nullable: true })
  @Prop()
  emergencyContactEmailAddress?: string;

  @Field({ nullable: true })
  @Prop()
  birthday?: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
