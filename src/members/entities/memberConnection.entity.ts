import { Field, ObjectType } from '@nestjs/graphql';
import NodeConnection from 'src/base/entities/NodeConnection';
import { MemberEntity } from './member.entity';

@ObjectType({ implements: NodeConnection })
export default class MemberConnection extends NodeConnection<MemberEntity> {
  @Field(() => [MemberEntity])
  nodes: MemberEntity[];
}
