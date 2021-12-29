import { Reservation, ReservationDocument } from './schema/reservations.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}
  async create(
    createReservationInput: CreateReservationInput,
  ): Promise<Reservation> {
    const createdReservation = new this.reservationModel(
      createReservationInput,
    );
    return createdReservation.save();
  }
  async findAll() {
    const reservations = this.reservationModel.find();
    return reservations;
  }
  async findOne(id: string) {
    const reservation = this.reservationModel.findById(id);
    return reservation;
  }
  async update(
    id: string,
    updateReservationInput: UpdateReservationInput,
  ): Promise<Reservation> {
    const reservationDoc = await this.reservationModel.findByIdAndUpdate(
      id,
      updateReservationInput,
      { new: true },
    );
    return reservationDoc;
  }
  async remove(id: string): Promise<Reservation> {
    const reservationDoc = await this.reservationModel.findByIdAndDelete(id);
    return reservationDoc;
  }
}
