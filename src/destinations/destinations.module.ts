import { Module } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsResolver } from './destinations.resolver';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Destination, DestinationFactory } from './schema/destinations.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Destination.name,
        useFactory: DestinationFactory,
        inject: [getConnectionToken()],
      },
    ]),
  ],
  exports: [DestinationsService],
  providers: [DestinationsResolver, DestinationsService],
})
export class DestinationsModule {}
