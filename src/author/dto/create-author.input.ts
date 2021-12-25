import { MinLength } from 'class-validator';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ defaultValue: '' })
  @MinLength(3)
  lastName: string;
}
