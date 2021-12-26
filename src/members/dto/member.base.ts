import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class MemberBase {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  emergencyContactName?: string;

  @Field({ nullable: true })
  emergencyContactNumber?: string;

  @Field({ nullable: true })
  emergencyContactEmailAddress?: string;

  @Field({ nullable: true })
  birthday?: Date;
}
