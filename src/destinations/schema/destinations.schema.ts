import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type DestinationDocument = Destination & Document;

@ObjectType({ isAbstract: true })
@Schema()
export class Destination {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field()
  maxSlots: number;

  @Prop()
  @Field()
  slotsLeft: number;

  @Prop()
  @Field({ nullable: true })
  imageUrl?: string;
}

export const DestinationsSchema = SchemaFactory.createForClass(Destination);

export const DestinationFactory = () => {
  const schema = DestinationsSchema;
  schema.pre('save', async function setSlotsLeft() {
    this.set('slotsLeft', this.get('maxSlots'));
  });
  return schema;
};
