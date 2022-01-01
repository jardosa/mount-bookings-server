import { CreateDestinationInput } from './create-destination.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDestinationInput extends PartialType(CreateDestinationInput) {
  @Field(() => Int)
  id: number;
}
