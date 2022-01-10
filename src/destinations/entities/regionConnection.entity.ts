import { Region } from './../schema/region.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import NodeConnection from 'src/base/entities/NodeConnection';

@ObjectType({ implements: NodeConnection })
export default class RegionConnection extends NodeConnection<Region> {
  @Field(() => [Region])
  nodes: Region[];
}
