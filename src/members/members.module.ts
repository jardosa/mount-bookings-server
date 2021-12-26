import { Member, MemberSchema } from './schemas/members.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersResolver } from './members.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  ],
  providers: [MembersResolver, MembersService],
})
export class MembersModule {}
