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
  async create(createMemberInput: CreateMemberInput): Promise<Member> {
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

  async findOne(id: string): Promise<MemberDocument> {
    const member = await this.memberModel.findOne({ id });

    if (!member) {
      throw new NotFoundException('User not found');
    }
    return member;
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
