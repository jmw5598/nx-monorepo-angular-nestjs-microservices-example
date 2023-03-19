import { Inject, Injectable } from '@nestjs/common';
import { RegistrationDto, Role, RoleTypes, Tenant, User, UserDto } from '@vsp/services/common';
import { In } from 'typeorm';

import { LoggerService } from '@vsp/services/logger';

import { IAccountsService } from '../interfaces/accounts-service.interface';
import { IRolesRepository, ROLES_REPOSITORY_TOKEN } from '../interfaces/roles-repository.interface';
import { ITenantsRepository, TENANTS_REPOSITORY_TOKEN } from '../interfaces/tenants-repository.interface';
import { IUsersRepository, USERS_REPOSITORY_TOKEN } from '../interfaces/users-repository.interface';

@Injectable()
export class AccountsService implements IAccountsService {
  @Inject(USERS_REPOSITORY_TOKEN)
  private readonly _usersRepository: IUsersRepository;

  @Inject(TENANTS_REPOSITORY_TOKEN)
  private readonly _tenantsRepository: ITenantsRepository;

  @Inject(ROLES_REPOSITORY_TOKEN)
  private readonly _rolesRepository: IRolesRepository;
  
  constructor(private readonly _logger: LoggerService) {
    this._logger.setContext(AccountsService.name);
  }

  public async register(registration: RegistrationDto): Promise<UserDto | null> {
    // Get roles for account owner's user
    const accountOwnerRoles: Role[] = await this._rolesRepository
      .findWithRelations({ where: { name: In([RoleTypes.ADMIN, RoleTypes.USER]) }});

    // Get claims for account owner's user - @TODO - feature when permissions are figured out.

    // Create new User from registration
    const user: User = this._createUserEntityFromRegistration(registration, accountOwnerRoles)
    return new UserDto(await this._usersRepository.save(user));
  }

  private _createUserEntityFromRegistration(registration: RegistrationDto, roles: Role[]): User {
    return this._usersRepository.create({
      ...registration.user,
      username: registration?.user?.username?.trim()?.toLowerCase(),
      email: registration?.user?.username?.trim().toLowerCase(),
      roles: roles,
      profile: {
        ...registration?.user?.profile,
        address: {
          ...registration?.user?.profile?.address
        }
      },
      tenant: {
        account: {
          ...registration?.account
        }
      } as Tenant
    })
  }
}
