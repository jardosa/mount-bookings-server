import { MembersModule } from 'src/members/members.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsResolver } from './reservations.resolver';
import { Reservation, ReservationSchema } from './schema/reservations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    MembersModule,
  ],
  providers: [ReservationsResolver, ReservationsService],
})
export class ReservationsModule {}
