import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Claims, UserDetails, userDetailsFromClaims } from '@vsp/services/common';
import { EnvironmentService } from '@vsp/services/core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _environmentService: EnvironmentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: _environmentService.get('IDENTITY_JWT_IGNORE_EXPIRATION') === 'true',
      secretOrKey: _environmentService.get('IDENTITY_JWT_SECRET'),
    });
  }

  public async validate(payload: Claims): Promise<UserDetails | null> {
    return userDetailsFromClaims(payload);
  }
}