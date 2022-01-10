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
  name: string;

  @Prop({ type: Types.ObjectId })
  @Field(() => Region)
  regionId: Region;
}
export const ProvinceSchema = SchemaFactory.createForClass(Province);
