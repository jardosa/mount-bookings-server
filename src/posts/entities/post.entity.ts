import { ObjectType, Field, ID } from '@nestjs/graphql';
import Node from 'src/base/entities/Node';

@ObjectType({ implements: Node })
export class Post {
  @Field()
  isPublished: boolean;

  @Field(() => ID)
  authorId: string;
}
