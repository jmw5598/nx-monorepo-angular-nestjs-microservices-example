import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthorizationModule } from '@vsp/services/authorization';
import { CoreModule } from '@vsp/services/core';
import { LoggerModule } from '@vsp/services/logger';

import { AuthController } from './controllers/auth.controller';
import { AccountsController } from './controllers/accounts.controller';
import { customersMicroserviceProvider, identityMicroserviceProvider, paymentsMicroserviceProvider } from './gateway.providers';
import { LocalStrategy } from './strategies/local.strategy';

import { JwtStrategy } from './strategies/jwt.strategy';
import { PaymentsController } from './controllers/payments.controller';
import { CustomersController } from './controllers/customers.controller';


@Module({
  imports: [
    CoreModule.forRoot(),
    AuthorizationModule,
    LoggerModule,
    PassportModule,
  ],
  controllers: [
    AuthController,
    AccountsController,
    PaymentsController,
    CustomersController
  ],
  providers: [
    identityMicroserviceProvider,
    customersMicroserviceProvider,
    paymentsMicroserviceProvider,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class GatewayModule {}
