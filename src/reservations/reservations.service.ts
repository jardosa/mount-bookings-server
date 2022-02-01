import { MembersService } from './../members/members.service';
import { Reservation, ReservationDocument } from './schema/reservations.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { Model, Types } from 'mongoose';
import { ReservationStatus } from './enums/reservations.enum';
import { MemberDocument } from 'src/members/schemas/members.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    private readonly memberService: MembersService,
  ) {}
  async create(
    createReservationInput: CreateReservationInput,
  ): Promise<Reservation> {
    const { leader, members, destination, ...rest } = createReservationInput;

    // Check if leader already exists
    const leaderRec = await this.memberService.findOne({
      email: leader.email,
      firstName: leader.firstName,
      lastName: leader.lastName,
    });

    let newLeaderRec: MemberDocument;
    if (!leaderRec) {
      newLeaderRec = await this.memberService.create(leader);
    }

    const memberDocs: MemberDocument[] = await Promise.all(
      members.map(async (member) => {
        const memberDoc = await this.memberService.findOneOrCreate(member);
        return memberDoc;
      }),
    );

    const createdReservation = new this.reservationModel({
      leader: leaderRec?._id ?? newLeaderRec._id,
      members: memberDocs.map((member) => member?._id),
      reservationStatus: ReservationStatus.Pending,
      destination: new Types.ObjectId(destination),
      ...rest,
    });
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

  async update(id: string, updateReservationInput): Promise<Reservation> {
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

  async updateStatus(
    id: string,
    status: ReservationStatus,
  ): Promise<Reservation> {
    const reservationDoc = await this.reservationModel.findByIdAndUpdate(
      id,
      { reservationStatus: status },
      { new: true },
    );

    return reservationDoc;
  }
}
