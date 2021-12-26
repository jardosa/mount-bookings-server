import { InputType, Field, ID } from '@nestjs/graphql';
import Node from 'src/base/entities/Node';
import { Member } from '../schemas/members.schema';

@InputType()
export class UpdateMemberInput extends Member implements Node {
  @Field(() => ID)
  _id: string;
}
