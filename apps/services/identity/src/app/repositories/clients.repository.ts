import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository, Client } from '@vsp/services/common';
import { IClientsRepository } from '../interfaces/clients-repository.interface';

@Injectable()
export class ClientsRepository extends BaseRepository<Client, string> implements IClientsRepository {
  constructor(
    @InjectRepository(Client)
    protected readonly repository: Repository<Client>
  ) {
    super(repository);
  }
}
