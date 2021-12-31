import { CreateMemberInput } from 'src/members/dto/create-member.input';
import { Field, InputType } from '@nestjs/graphql';
import { ReservationStatus } from '../enums/reservations.enum';

@InputType()
export class CreateReservationInput {
  @Field(() => CreateMemberInput)
  leader: CreateMemberInput;
  @Field(() => [CreateMemberInput])
  members: CreateMemberInput[];
  @Field()
  hikeDateStart: Date;
  @Field()
  hikeDateEnd: Date;
  @Field(() => ReservationStatus, {
    nullable: true,
    defaultValue: ReservationStatus.Pending,
  })
  reservationStatus?: ReservationStatus;
}
