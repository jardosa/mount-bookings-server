import { CreateMemberInput } from 'src/members/dto/create-member.input';
import { Field, InputType } from '@nestjs/graphql';

import { ReservationStatus } from '../enums/reservations.enum';

@InputType()
export class CreateReservationInput {
  @Field(() => CreateMemberInput)
  leader: CreateMemberInput;
  @Field(() => [CreateMemberInput])
  members: CreateMemberInput[];
  @Field(() => ReservationStatus)
  reservationStatus: ReservationStatus;
  @Field()
  hikeDateStart: Date;
  @Field()
  hikeDateEnd: Date;
}
