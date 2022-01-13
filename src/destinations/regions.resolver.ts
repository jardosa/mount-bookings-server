import { Province, ProvinceDocument } from './schema/province.schema';
import {
  Mutation,
  ResolveField,
  Resolver,
  Parent,
  Query,
} from '@nestjs/graphql';
import { DestinationsService } from './destinations.service';
import RegionConnection from './entities/regionConnection.entity';
import { Region } from './schema/region.schema';

@Resolver(() => Region)
export class RegionsResolver {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Query(() => RegionConnection)
  async findAllRegions(): Promise<RegionConnection> {
    const regions = await this.destinationsService.findAllRegions();
    return {
      totalCount: regions.length,
      nodes: regions,
    };
  }

  @ResolveField('provinces', () => [Province])
  async getProvinces(@Parent() region: Region): Promise<ProvinceDocument[]> {
    const { regCode } = region;

    const provinceDocs =
      await this.destinationsService.findProvincesByRegionCode(regCode);
    return provinceDocs;
  }
}
