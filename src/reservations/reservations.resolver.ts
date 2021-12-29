import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { ReservationEntity } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { Reservation } from './schema/reservations.schema';
import ReservationConnection from './entities/reservationConnection.entity';

@Resolver(() => ReservationEntity)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => ReservationEntity)
  createReservation(
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
  findOne(@Args('id', { type: () => ID }) id: string) {
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
  removeReservation(@Args('id', { type: () => ID }) id: string) {
    return this.reservationsService.remove(id);
  }
}
