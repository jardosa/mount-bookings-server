import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthorDocument = Author & Document;

@Schema({ timestamps: true })
export class Author {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
