import { CreateReservationInput } from './create-reservation.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import Node from 'src/base/entities/Node';

@InputType()
export class UpdateReservationInput
  extends PartialType(CreateReservationInput)
  implements Node
{
  @Field(() => ID)
  _id: string;
}
