import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DestinationsService } from './destinations.service';
import { DestinationEntity } from './entities/destination.entity';
import { CreateDestinationInput } from './dto/create-destination.input';
import { UpdateDestinationInput } from './dto/update-destination.input';
import DestinationConnection from './entities/destinationConnection.entity';

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

  @Query(() => DestinationEntity, { name: 'destination' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.destinationsService.findOne(id);
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
}
