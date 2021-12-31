import { MembersService } from './../members/members.service';
import { MemberEntity } from './../members/entities/member.entity';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { ReservationEntity } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';

import ReservationConnection from './entities/reservationConnection.entity';
import { MemberDocument } from 'src/members/schemas/members.schema';
import { ReservationStatus } from './enums/reservations.enum';

@Resolver(() => ReservationEntity)
export class ReservationsResolver {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly memberService: MembersService,
  ) {}

  @Mutation(() => ReservationEntity)
  async createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ) {
    return this.reservationsService.create(createReservationInput);
  }

  @Query(() => ReservationConnection, { name: 'reservations' })
  async findAll(): Promise<ReservationConnection> {
    const reservations = await this.reservationsService.findAll();
    return {
      totalCount: reservations.length,
      nodes: reservations,
    };
  }

  @Query(() => ReservationEntity, { name: 'reservation' })
  findOne(@Args('_id', { type: () => ID }) id: string) {
    const reservation = this.reservationsService.findOne(id);
    return reservation;
  }

  @Mutation(() => ReservationEntity)
  updateReservation(
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ) {
    return this.reservationsService.update(
      updateReservationInput._id,
      updateReservationInput,
    );
  }

  @Mutation(() => ReservationEntity)
  removeReservation(@Args('_id', { type: () => ID }) id: string) {
    const reservationDoc = this.reservationsService.remove(id);
    return reservationDoc;
  }
  // @Mutation(() => ReservationEntity)
  // async updateReservationStatus(
  //   @Args('_id', { type: () => ID }) id: string,
  //   @Args('status', { type: () => ReservationStatus })
  //   status: ReservationStatus,
  // ) {
  //   const reservationDoc = this.reservationsService.update(id, {
  //     reservationStatus: status,
  //   });
  // }

  @ResolveField('leader', () => MemberEntity)
  async getLeader(
    @Parent() reservation: ReservationEntity,
  ): Promise<MemberDocument> {
    const { _id } = reservation;
    const doc = await this.reservationsService.findOne(_id);
    const leader = await this.memberService.findOneById(doc.leader._id);

    return leader;
  }

  @ResolveField('members', () => [MemberEntity])
  async getMembers(
    @Parent() reservation: ReservationEntity,
  ): Promise<MemberDocument[]> {
    const { _id } = reservation;
    const doc = await this.reservationsService.findOne(_id);
    const members = await this.memberService.findReservationMembers(
      ...doc.members.map((member) => member._id),
    );

    return members;
  }
}
