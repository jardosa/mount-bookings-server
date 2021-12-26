import { ObjectType, Field, ID } from '@nestjs/graphql';
import Node from 'src/base/entities/Node';
import { Member } from '../schemas/members.schema';

@ObjectType({ implements: [Node] })
export class MemberEntity extends Member {
  @Field(() => ID)
  _id: string;
}
