import { Test, TestingModule } from '@nestjs/testing';
import { TenantsRepository } from './tenants.repository';

describe('TenantsRepository', () => {
  let service: TenantsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantsRepository],
    }).compile();

    service = module.get<TenantsRepository>(TenantsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
