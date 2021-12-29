import { ReservationEntity } from './reservation.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import NodeConnection from 'src/base/entities/NodeConnection';

@ObjectType({ implements: NodeConnection })
export default class ReservationConnection extends NodeConnection<ReservationEntity> {
  @Field(() => [ReservationEntity])
  nodes: ReservationEntity[];
}
