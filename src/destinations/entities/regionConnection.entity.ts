import { Field, ObjectType } from '@nestjs/graphql';
import NodeConnection from 'src/base/entities/NodeConnection';
import { Region } from '../schema/region.schema';

@ObjectType({ implements: NodeConnection })
export default class RegionConnection extends NodeConnection<Region> {
  @Field(() => [Region])
  nodes: Region[];
}
