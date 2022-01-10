import { Province, ProvinceDocument } from './schema/province.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDestinationInput } from './dto/create-destination.input';
import { UpdateDestinationInput } from './dto/update-destination.input';
import { Destination, DestinationDocument } from './schema/destinations.schema';
import { Region, RegionDocument } from './schema/region.schema';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name)
    private destinationModel: Model<DestinationDocument>,
    @InjectModel(Region.name)
    private regionModel: Model<RegionDocument>,
    @InjectModel(Province.name)
    private provinceModel: Model<ProvinceDocument>,
  ) {}

  async create(
    createDestinationInput: CreateDestinationInput,
  ): Promise<DestinationDocument> {
    const createdDestination = new this.destinationModel(
      createDestinationInput,
    );
    return createdDestination.save();
  }

  async findAll() {
    const destinationDocs = this.destinationModel.find();
    return destinationDocs;
  }

  findOne(id: number) {
    return `This action returns a #${id} destination`;
  }

  update(id: number, updateDestinationInput: UpdateDestinationInput) {
    return `This action updates a #${id} destination`;
  }

  remove(id: number) {
    return `This action removes a #${id} destination`;
  }

  async findAllRegions() {
    const regionDocs = this.regionModel.find();
    return regionDocs;
  }
  async findAllProvinces() {
    const provinceDocs = this.provinceModel.find();
    return provinceDocs;
  }
}
