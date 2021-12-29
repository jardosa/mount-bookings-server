// import { CreateMemberInput } from './../../members/dto/create-member.input';

import { MemberSchema } from './../../members/schemas/members.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReservationStatus } from '../enums/reservations.enum';
import { Document } from 'mongoose';
import { MemberEntity } from 'src/members/entities/member.entity';

export type ReservationDocument = Reservation & Document;

@ObjectType({ isAbstract: true })
@Schema({ timestamps: true })
export class Reservation {
  @Prop({ type: MemberSchema })
  @Field(() => MemberEntity)
  leader: MemberEntity;

  @Prop({ type: [MemberSchema] })
  @Field(() => [MemberEntity])
  members: MemberEntity[];

  @Prop()
  @Field(() => ReservationStatus)
  reservationStatus: ReservationStatus;

  @Prop()
  @Field()
  hikeDateStart: Date;

  @Prop()
  @Field()
  hikeDateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
