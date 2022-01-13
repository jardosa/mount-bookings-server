import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model, Types } from 'mongoose';
import Node from 'src/base/entities/Node';
import ProvinceConnection from '../entities/provinceConnection.entity';
import { Province } from './province.schema';

export type RegionDocument = Region & Document;

@Schema()
@ObjectType({ implements: Node })
export class Region extends Node {
  @Prop()
  @Field()
  regDesc: string;

  @Prop({ type: String })
  @Field()
  regCode: string;

  @Prop({ type: String })
  @Field({ description: 'Philippine Standard Geographic Code', nullable: true })
  psgcCode?: string;

  @Field(() => ProvinceConnection)
  provinces: Province[];
}

export const RegionSchema = SchemaFactory.createForClass(Region);

export const RegionFactory = () => {
  const schema = RegionSchema;
  return schema;
};
