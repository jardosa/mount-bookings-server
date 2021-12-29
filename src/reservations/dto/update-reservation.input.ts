import { InputType, Field, ID } from '@nestjs/graphql';
import { Reservation } from '../schema/reservations.schema';
import Node from 'src/base/entities/Node';

@InputType()
export class UpdateReservationInput extends Reservation implements Node {
  @Field(() => ID)
  _id: string;
}
