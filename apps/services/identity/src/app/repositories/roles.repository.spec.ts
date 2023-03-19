import { Test, TestingModule } from '@nestjs/testing';
import { RolesRepository } from './roles.repository';

describe('RolesRepository', () => {
  let service: RolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesRepository],
    }).compile();

    service = module.get<RolesRepository>(RolesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
