import { MemberKeys } from './interfaces/memberKeys.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import MemberConnection from './entities/memberConnection.entity';
import { Member, MemberDocument } from './schemas/members.schema';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  async findOneOrCreate(member: Member): Promise<MemberDocument> {
    const memberDoc = await this.memberModel.findOne({
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
    });

    if (memberDoc) {
      return memberDoc;
    }

    const newMemberDoc = new this.memberModel(member);

    return newMemberDoc.save();
  }

  async create(createMemberInput: CreateMemberInput): Promise<MemberDocument> {
    const createdMember = new this.memberModel(createMemberInput);
    return createdMember.save();
  }

  async findAll(): Promise<MemberConnection> {
    const members = await this.memberModel.find();

    return {
      totalCount: members.length,
      nodes: members,
    };
  }

  async findOne(args: MemberKeys): Promise<MemberDocument | null> {
    const member = await this.memberModel.findOne(args);
    return member;
  }

  async findOneById(id: string): Promise<MemberDocument | null> {
    const member = await this.memberModel.findOne({ id });

    return member;
  }

  async findOneByEmail(email: string): Promise<MemberDocument | null> {
    const member = await this.memberModel.findOne({ email });

    return member;
  }

  async findReservationMembers(
    ...args: string[]
  ): Promise<MemberDocument[] | []> {
    const ids = args;
    const members = await this.memberModel.find({ _id: { $in: ids } });

    return members;
  }

  async update(
    id: string,
    updateMemberInput: UpdateMemberInput,
  ): Promise<MemberDocument> {
    const member = await this.memberModel.findByIdAndUpdate(id, {
      ...updateMemberInput,
    });
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }

  async remove(id: string) {
    const memberToDelete = await this.memberModel.findByIdAndDelete(id);

    if (!memberToDelete) {
      throw new NotFoundException('Member not found');
    }

    return memberToDelete;
  }
}
