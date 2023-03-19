import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository, RefreshToken } from '@vsp/services/common';

import { IRefreshTokensRepository } from '../interfaces/refresh-token-repository.interface';

@Injectable()
export class RefreshTokensRepository 
    extends BaseRepository<RefreshToken, string> 
    implements IRefreshTokensRepository {
  constructor(
    @InjectRepository(RefreshToken)
    protected readonly repository: Repository<RefreshToken>
  ) {
    super(repository);
  }
}
