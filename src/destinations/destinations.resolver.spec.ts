import { Test, TestingModule } from '@nestjs/testing';
import { DestinationsResolver } from './destinations.resolver';
import { DestinationsService } from './destinations.service';

describe('DestinationsResolver', () => {
  let resolver: DestinationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DestinationsResolver, DestinationsService],
    }).compile();

    resolver = module.get<DestinationsResolver>(DestinationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
