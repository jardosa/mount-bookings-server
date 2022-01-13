import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRegionInput {
  @Field()
  name: string;

  @Field()
  regionalDesignation: string;

  @Field()
  psgc: string;
}
