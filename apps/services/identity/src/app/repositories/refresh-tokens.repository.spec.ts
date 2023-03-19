import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokensRepository } from './refresh-tokens.repository';

describe('RefreshTokensRepository', () => {
  let service: RefreshTokensRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshTokensRepository],
    }).compile();

    service = module.get<RefreshTokensRepository>(RefreshTokensRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
