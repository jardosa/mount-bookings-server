import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { Province } from './province.schema';
import slugify from 'slugify';

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
  slug: string;

  @Prop()
  @Field()
  slotsLeft: number;

  @Prop()
  @Field({ nullable: true })
  imageUrl?: string;

  @Prop({ type: String })
  @Field(() => Province)
  province: string;
}

export const DestinationsSchema = SchemaFactory.createForClass(Destination);

export const DestinationFactory = () => {
  const schema = DestinationsSchema;
  schema.pre('save', async function setSlotsLeft() {
    this.set('slotsLeft', this.get('maxSlots'));
  });
  schema.pre('save', async function setSlug() {
    this.set('slug', slugify(this.get('name')));
  });

  return schema;
};
