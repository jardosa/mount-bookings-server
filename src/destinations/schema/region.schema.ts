import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import Node from 'src/base/entities/Node';
import ProvinceConnection from '../entities/provinceConnection.entity';
import { Province } from './province.schema';

export type RegionDocument = Region & Document;

@Schema()
@ObjectType({ implements: Node })
export class Region extends Node {
  @Prop()
  @Field()
  name: string;

  @Prop({ type: [Types.ObjectId] })
  @Field(() => ProvinceConnection)
  provinces: Province[];
}

export const RegionSchema = SchemaFactory.createForClass(Region);
