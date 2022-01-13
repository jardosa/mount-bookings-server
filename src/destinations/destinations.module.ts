import { ProvincesResolver } from './provinces.resolver';
import { RegionsResolver } from './regions.resolver';
import { Module } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsResolver } from './destinations.resolver';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Destination, DestinationFactory } from './schema/destinations.schema';
import { Province, ProvinceFactory } from './schema/province.schema';
import { Region, RegionFactory } from './schema/region.schema';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeatureAsync([
      {
        name: Destination.name,
        useFactory: DestinationFactory,
        inject: [getConnectionToken()],
      },
      {
        name: Province.name,
        useFactory: ProvinceFactory,
        inject: [getConnectionToken()],
      },
      {
        name: Region.name,
        useFactory: RegionFactory,
        inject: [getConnectionToken()],
      },
    ]),
  ],
  exports: [DestinationsService],
  providers: [
    DestinationsResolver,
    RegionsResolver,
    ProvincesResolver,
    DestinationsService,
  ],
})
export class DestinationsModule {}
