import { InputType } from '@nestjs/graphql';
import { Member } from '../schemas/members.schema';

@InputType()
export class CreateMemberInput extends Member {}
