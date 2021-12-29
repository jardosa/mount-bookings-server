import { ObjectType, Field, ID } from '@nestjs/graphql';
import Node from 'src/base/entities/Node';
import { Reservation } from '../schema/reservations.schema';

@ObjectType({ implements: [Node] })
export class ReservationEntity extends Reservation {
  @Field(() => ID)
  _id: string;
}
