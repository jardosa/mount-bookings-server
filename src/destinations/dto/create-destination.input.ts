import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDestinationInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  maxSlots: number;

  @Field()
  province: string;
}
