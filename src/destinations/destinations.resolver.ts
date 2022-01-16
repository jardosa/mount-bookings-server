import { Province, ProvinceDocument } from './schema/province.schema';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { DestinationsService } from './destinations.service';
import { DestinationEntity } from './entities/destination.entity';
import { CreateDestinationInput } from './dto/create-destination.input';
import { UpdateDestinationInput } from './dto/update-destination.input';
import DestinationConnection from './entities/destinationConnection.entity';
import { Region } from './schema/region.schema';

@Resolver(() => DestinationEntity)
export class DestinationsResolver {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Mutation(() => DestinationEntity)
  createDestination(
    @Args('createDestinationInput')
    createDestinationInput: CreateDestinationInput,
  ) {
    return this.destinationsService.create(createDestinationInput);
  }

  @Query(() => DestinationConnection, { name: 'destinations' })
  async findAll(): Promise<DestinationConnection> {
    const destinationDocs = await this.destinationsService.findAll();

    if (!destinationDocs) {
      return {
        totalCount: 0,
        nodes: [],
      };
    }

    return {
      totalCount: destinationDocs.length,
      nodes: destinationDocs,
    };
  }

  @Query(() => DestinationEntity, { name: 'destinationById' })
  findOneById(@Args('_id', { type: () => ID }) _id: string) {
    return this.destinationsService.findOne(_id);
  }

  @Query(() => DestinationEntity, { name: 'destinationBySlug' })
  findOneBySlug(@Args('slug', { type: () => String }) slug: string) {
    return this.destinationsService.findOneBySlug(slug);
  }

  @Mutation(() => DestinationEntity)
  updateDestination(
    @Args('updateDestinationInput')
    updateDestinationInput: UpdateDestinationInput,
  ) {
    return this.destinationsService.update(
      updateDestinationInput.id,
      updateDestinationInput,
    );
  }

  @Mutation(() => DestinationEntity)
  removeDestination(@Args('id', { type: () => Int }) id: number) {
    return this.destinationsService.remove(id);
  }

  @ResolveField('province', () => Province)
  async getProvince(
    @Parent() destination: DestinationEntity,
  ): Promise<ProvinceDocument> {
    const { province } = destination;

    const provinceDoc = await this.destinationsService.findProvinceByName(
      province,
    );
    return provinceDoc;
  }

  @ResolveField('provinces', () => [Province])
  async getProvinces(@Parent() region: Region): Promise<ProvinceDocument[]> {
    const { regCode } = region;

    const provinceDocs =
      await this.destinationsService.findProvincesByRegionCode(regCode);
    return provinceDocs;
  }
}
