import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '@vsp/services/authorization';
import { Account, Address, Claim, Client, DeviceCode, Profile, RefreshToken, Role, Tenant, User } from '@vsp/services/common';
import { CoreModule, TypeOrmConfigService } from '@vsp/services/core';
import { LoggerModule } from '@vsp/services/logger';

import { AccountsController } from './controllers/accounts.controller';
import { AuthController } from './controllers/auth.controller';

import { AUTH_SERVICE_TOKEN } from './interfaces/auth-service.interface';
import { AuthService } from './services/auth.service';

import { TOKENS_SERVICE_TOKEN } from './interfaces/tokens-service.interface';
import { TokensService } from './services/tokens.service';

import { REFRESH_TOKENS_REPOSITORY_TOKEN } from './interfaces/refresh-token-repository.interface';
import { RefreshTokensRepository } from './repositories/refresh-tokens.repository';

import { USERS_REPOSITORY_TOKEN } from './interfaces/users-repository.interface';
import { UsersRepository } from './repositories/users.repository';

import { USERS_SERVICE_TOKEN } from './interfaces/users-service.interface';
import { UsersService } from './services/users.service';

import { CLIENTS_REPOSITORY_TOKEN } from './interfaces/clients-repository.interface';
import { ClientsRepository } from './repositories/clients.repository';

import { ACCOUNTSS_SERVICE_TOKEN } from './interfaces/accounts-service.interface';
import { AccountsService } from './services/accounts.service';

import { TENANTS_REPOSITORY_TOKEN } from './interfaces/tenants-repository.interface';
import { TenantsRepository } from './repositories/tenants.repository';

import { ROLES_REPOSITORY_TOKEN } from './interfaces/roles-repository.interface';
import { RolesRepository } from './repositories/roles.repository';

@Module({
  imports: [
    CoreModule.forRoot(),
    LoggerModule,
    AuthorizationModule,
    TypeOrmModule.forRootAsync({
      imports: [CoreModule.forRoot()],
      useClass: TypeOrmConfigService
    }),
    TypeOrmModule.forFeature([
      Account,
      Address,
      Claim,
      Client,
      DeviceCode,
      Profile,
      RefreshToken,
      Role,
      Tenant,
      User
    ])
  ],
  controllers: [
    AccountsController,
    AuthController,
  ],
  providers: [
    {
      provide: ACCOUNTSS_SERVICE_TOKEN,
      useClass: AccountsService
    },
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService
    },
    {
      provide: TOKENS_SERVICE_TOKEN,
      useClass: TokensService
    },
    {
      provide: USERS_SERVICE_TOKEN,
      useClass: UsersService
    },
    {
      provide: USERS_REPOSITORY_TOKEN,
      useClass: UsersRepository
    },
    {
      provide: REFRESH_TOKENS_REPOSITORY_TOKEN,
      useClass: RefreshTokensRepository
    },
    {
      provide: CLIENTS_REPOSITORY_TOKEN,
      useClass: ClientsRepository
    },
    {
      provide: TENANTS_REPOSITORY_TOKEN,
      useClass: TenantsRepository
    },
    {
      provide: ROLES_REPOSITORY_TOKEN,
      useClass: RolesRepository
    }
  ],
})
export class IdentityModule {}
