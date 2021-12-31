import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MembersService } from './members.service';
import { MemberEntity } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import MemberConnection from './entities/memberConnection.entity';

@Resolver(() => MemberEntity)
export class MembersResolver {
  constructor(private readonly membersService: MembersService) {}

  @Mutation(() => MemberEntity)
  createMember(
    @Args('createMemberInput') createMemberInput: CreateMemberInput,
  ) {
    return this.membersService.create(createMemberInput);
  }

  @Query(() => MemberConnection, { name: 'members' })
  findAll() {
    return this.membersService.findAll();
  }

  @Query(() => MemberEntity, { name: 'member' })
  findOne(@Args('_id', { type: () => String }) id: string) {
    return this.membersService.findOneById(id);
  }

  @Mutation(() => MemberEntity)
  updateMember(
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput,
  ) {
    return this.membersService.update(updateMemberInput._id, updateMemberInput);
  }

  @Mutation(() => MemberEntity)
  removeMember(@Args('_id') id: string) {
    return this.membersService.remove(id);
  }
}
