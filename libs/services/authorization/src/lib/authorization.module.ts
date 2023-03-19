import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { CoreModule, EnvironmentService } from '@vsp/services/core';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [CoreModule.forRoot()],
      useFactory: (environmentService: EnvironmentService) => {
        return {
          secret: environmentService.get('IDENTITY_JWT_SECRET'),
          publicKey: environmentService.get('IDENTITY_JWT_PUBLIC_KEY'),
          privateKey: environmentService.get('IDENTITY_JWT_PRIVATE_KEY'),
          signOptions: {
            expiresIn: environmentService.get('IDENTITY_JWT_EXPIRES_IN')
          },
          verifyOptions: {
            // Other validation options such as issuer
            ignoreExpiration: environmentService.get('IDENTITY_JWT_IGNORE_EXPIRATION') === 'true'
          }
        } as JwtModuleOptions
      },
      inject: [EnvironmentService]
    })
  ],
  providers: [
    JwtAuthGuard,
    LocalAuthGuard,
  ],
  exports: [
    JwtAuthGuard,
    LocalAuthGuard,
    JwtModule,
  ],
})
export class AuthorizationModule {}
