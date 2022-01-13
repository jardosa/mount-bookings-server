import {
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DestinationsService } from './destinations.service';
import ProvinceConnection from './entities/provinceConnection.entity';
import { Province } from './schema/province.schema';
import { Region, RegionDocument } from './schema/region.schema';

@Resolver(() => Province)
export class ProvincesResolver {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Query(() => ProvinceConnection)
  async findAllProvinces(): Promise<ProvinceConnection> {
    const provinces = await this.destinationsService.findAllProvinces();
    return {
      totalCount: provinces.length,
      nodes: provinces,
    };
  }

  // TODO: Fix Field Resolver
  @ResolveField('region', () => Region)
  async getRegion(@Parent() province: Province): Promise<RegionDocument> {
    const { region } = province;
    const regionDoc = await this.destinationsService.findRegionByRegionCode(
      region,
    );
    return regionDoc;
  }
}
