import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository, Tenant } from '@vsp/services/common';

import { ITenantsRepository } from '../interfaces/tenants-repository.interface';

@Injectable()
export class TenantsRepository extends BaseRepository<Tenant, string> implements ITenantsRepository {
  constructor(
    @InjectRepository(Tenant)
    protected readonly repository: Repository<Tenant>
  ) {
    super(repository);
  }
}
