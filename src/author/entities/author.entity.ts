import { Post } from './../../posts/entities/post.entity';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => [Post], { nullable: 'items' })
  posts?: Post[];
}
