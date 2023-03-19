import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { v4 as uuid } from 'uuid';

import { Claims, ClaimKeys, RefreshToken, TokenPair } from '@vsp/services/common';
import { LoggerService } from '@vsp/services/logger';

import { IRefreshTokensRepository, REFRESH_TOKENS_REPOSITORY_TOKEN } from '../interfaces/refresh-token-repository.interface';
import { ITokensService } from '../interfaces/tokens-service.interface';

@Injectable()
export class TokensService implements ITokensService {
  @Inject(REFRESH_TOKENS_REPOSITORY_TOKEN)
  private readonly _refreshTokensRepository: IRefreshTokensRepository

  constructor(
    private readonly _logger: LoggerService,
    private readonly _jwtService: JwtService
  ) {
    this._logger.setContext(TokensService.name);
  }

  public async signToken(claims: Claims): Promise<TokenPair> {
    try {
      // Check for exsting token that isn't blacklisted
      let existingRefreshToken: RefreshToken | null = await this._refreshTokensRepository
        .findByCondition({
          relations: ['user'],
          where: { isBlacklisted: false, user: { id: claims[ClaimKeys.SUBJECT] } }
        });

      // If existing refresh token doesnt exist create a new one.
      if (!existingRefreshToken) {
        existingRefreshToken = await this._refreshTokensRepository.save(
          this._refreshTokensRepository.create({ 
            refreshToken:  uuid(), 
            user: { id : claims[ClaimKeys.SUBJECT] } 
          })
        );
      }

      return new TokenPair({
        accessToken: this._jwtService.sign({ ...claims }),
        refreshToken: existingRefreshToken.refreshToken
      });
    } catch (error) {
      this._logger.error('Error signing tokens', error);
      throw error;
    }
  }

  public async refreshToken(tokens: TokenPair): Promise<TokenPair> {
    try {
      // Check that the refreshToken isn't blacklisted.
      const validRefreshToken: RefreshToken | null = await this._refreshTokensRepository
        .findByCondition({ 
          where: { 
            refreshToken: tokens?.refreshToken, 
            isBlacklisted: false 
          }
        });

      if (!validRefreshToken) {
        throw new RpcException(
          new UnauthorizedException("Invalid refresh/access token!")
        );
      }

      const decodedTokenMap: any = this._jwtService.decode(tokens?.accessToken);
      
      if (!decodedTokenMap) {
        throw new RpcException(
          new UnauthorizedException("Invalid refresh/access token!")
        );
      }
      const { exp, iat, ...tokenOptions } = decodedTokenMap;

      return new TokenPair({
        refreshToken: validRefreshToken.refreshToken,
        accessToken: this._jwtService.sign(tokenOptions)
      } satisfies TokenPair);

    } catch (error) {
      this._logger.error('Error refreshing token pair', error);
      throw error;
    }
  }
}
