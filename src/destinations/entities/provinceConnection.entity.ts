import { Field, ObjectType } from '@nestjs/graphql';
import NodeConnection from 'src/base/entities/NodeConnection';
import { Province } from '../schema/province.schema';

@ObjectType({ implements: NodeConnection })
export default class ProvinceConnection extends NodeConnection<Province> {
  @Field(() => [Province])
  nodes: Province[];
}
