import { Field, ObjectType } from '@nestjs/graphql';
import NodeConnection from 'src/base/entities/NodeConnection';
import { DestinationEntity } from './destination.entity';

@ObjectType({ implements: NodeConnection })
export default class DestinationConnection extends NodeConnection<DestinationEntity> {
  @Field(() => [DestinationEntity])
  nodes: DestinationEntity[];
}
