import { Test, TestingModule } from '@nestjs/testing';
import { ClientsRepository } from './clients.repository';

describe('ClientsRepository', () => {
  let service: ClientsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsRepository],
    }).compile();

    service = module.get<ClientsRepository>(ClientsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
