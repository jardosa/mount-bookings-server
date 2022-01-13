import { CreateRegionInput } from './dto/create-region.input';
import { Province, ProvinceDocument } from './schema/province.schema';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDestinationInput } from './dto/create-destination.input';
import { UpdateDestinationInput } from './dto/update-destination.input';
import { Destination, DestinationDocument } from './schema/destinations.schema';
import { Region, RegionDocument } from './schema/region.schema';
import * as provinces from './lib/refprovinces.json';

import * as regions from './lib/refregions.json';

@Injectable()
export class DestinationsService implements OnModuleInit {
  constructor(
    @InjectModel(Region.name)
    private regionModel: Model<RegionDocument>,
    @InjectModel(Destination.name)
    private destinationModel: Model<DestinationDocument>,
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

  async findRegionById(_id: string) {
    const regionDoc = await this.regionModel.findById(_id);
    return regionDoc;
  }

  async findRegionByRegionCode(regCode: string) {
    const regionDoc = await this.regionModel.findOne({ regCode });

    return regionDoc;
  }

  async createRegion(createRegionInput: CreateRegionInput) {
    const doc = new this.regionModel(createRegionInput);
    return doc.save();
  }

  async findProvincesByRegionId(
    ...args: string[]
  ): Promise<ProvinceDocument[] | []> {
    const ids = args;
    const provinces = await this.provinceModel.find({ _id: { $in: ids } });

    return provinces;
  }

  async findProvincesByRegionCode(
    regCode: string,
  ): Promise<ProvinceDocument[] | []> {
    const provinces = await this.provinceModel.find({ region: regCode });

    return provinces;
  }

  async onModuleInit() {
    // check if all regions exist
    for await (const region of regions.RECORDS) {
      const regionDoc = await this.regionModel.findOne({
        regCode: region.regCode,
      });

      if (!regionDoc)
        await this.regionModel.create({
          ...region,
        });
    }

    await Promise.all(
      provinces.RECORDS.map(async (province) => {
        const provinceDoc = await this.provinceModel.findOneAndUpdate(
          { provDesc: province.provDesc },
          { region: province.regCode, ...province },
          { upsert: true },
        );
      }),
    );
  }
}
