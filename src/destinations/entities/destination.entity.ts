import { ObjectType, Field, ID } from '@nestjs/graphql';
import Node from 'src/base/entities/Node';
import { Destination } from '../schema/destinations.schema';

@ObjectType({ implements: Node })
export class DestinationEntity extends Destination {
  @Field(() => ID)
  _id: string;
}
