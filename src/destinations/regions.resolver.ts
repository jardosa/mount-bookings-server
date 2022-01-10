import { Mutation, Resolver } from '@nestjs/graphql';
import { DestinationsService } from './destinations.service';
import RegionConnection from './entities/regionConnection.entity';
import { Region } from './schema/region.schema';

@Resolver(() => Region)
export class RegionsResolver {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Mutation()
  async findAll(): Promise<RegionConnection> {
    const regions = await this.destinationsService.findAllRegions();
    return {
      totalCount: regions.length,
      nodes: regions,
    };
  }
}
