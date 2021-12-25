import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostSchema = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop()
  isPublished: boolean;

  @Prop()
  authorId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
