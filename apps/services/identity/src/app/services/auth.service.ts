import { Inject, Injectable } from '@nestjs/common';

import { 
  AuthenticatedStatus, 
  AuthenticatedUser, 
  Claims, 
  claimsFromUserDetails, 
  Credentials, 
  TokenPair, 
  UserDetails } from '@vsp/services/common';

import { LoggerService } from '@vsp/services/logger';

import { IAuthService } from '../interfaces/auth-service.interface';
import { ITokensService, TOKENS_SERVICE_TOKEN } from '../interfaces/tokens-service.interface';
import { IUsersService, USERS_SERVICE_TOKEN } from '../interfaces/users-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  @Inject(TOKENS_SERVICE_TOKEN)
  private readonly _tokensService: ITokensService;

  @Inject(USERS_SERVICE_TOKEN)
  private readonly _usersService: IUsersService;
  
  constructor(private readonly _logger: LoggerService) {
    this._logger.setContext(AuthService.name);
  }

  public async validateUser(credentials: Credentials): Promise<UserDetails | null> {
    try {
      return await this._usersService.validateUser(credentials);
    } catch (error) {
      this._logger.error('Error validating user', error);
      throw error;
    }
  }

  public async signIn(user: UserDetails): Promise<AuthenticatedUser> {
    try {
      const claimsPayload: Claims = claimsFromUserDetails(user) || {};
      return new AuthenticatedUser({
        status: AuthenticatedStatus.AUTHENTICATED,
        tokens: await this._tokensService.signToken(claimsPayload)
      });
    } catch (error) {
      this._logger.error('Error signing in user', error);
      throw error;
    }
  }

  public async refreshToken(tokens: TokenPair): Promise<TokenPair> {
    try {
      return await this._tokensService.refreshToken(tokens);
    } catch (error) {
      this._logger.error('Error refreshing access token', error);
      throw error;
    }
  }
}
