import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository, User } from '@vsp/services/common';

import { IUsersRepository } from '../interfaces/users-repository.interface';

@Injectable()
export class UsersRepository extends BaseRepository<User, string> implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>
  ) {
    super(repository);
  }
}
