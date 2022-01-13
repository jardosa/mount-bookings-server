import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import Node from 'src/base/entities/Node';
import { Region } from './region.schema';

export type ProvinceDocument = Province & Document;

@Schema()
@ObjectType({ implements: Node })
export class Province extends Node {
  @Prop()
  @Field()
  provDesc: string;

  @Prop()
  @Field()
  psgcCode: string;

  @Prop()
  @Field()
  provCode: string;

  // FIX PROVINCE SCHEMA AND RESOLVER`
  @Prop({ type: String })
  @Field(() => Region)
  region: string;
}
export const ProvinceSchema = SchemaFactory.createForClass(Province);

export const ProvinceFactory = () => {
  const schema = ProvinceSchema;
  return schema;
};
