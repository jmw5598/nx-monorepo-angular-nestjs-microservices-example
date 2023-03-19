import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';

import { LoggerService } from '@vsp/services/logger';
import { LocalAuthGuard } from '@vsp/services/authorization';

import { 
  AuthenticatedUser, 
  IDENTITY_SERVICE_TOKEN, 
  refreshTokenCommand,
  signInCommand, 
  TokenPair, 
  UserDetails } from '@vsp/services/common';

@Controller('auth')
export class AuthController {
  @Inject(IDENTITY_SERVICE_TOKEN)
  private readonly _identityServiceClient: ClientProxy;

  constructor(private readonly _logger: LoggerService) {
    this._logger.setContext(AuthController.name);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public signIn(@Request() req: any): Observable<AuthenticatedUser> {
    const user: UserDetails = new UserDetails({ ...req.user });
    return this._identityServiceClient
      .send(signInCommand, user)
      .pipe(catchError(error => throwError(() => new RpcException(error.response))))
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  public refreshToken(@Body() tokens: TokenPair): Observable<any> {
    return this._identityServiceClient
      .send(refreshTokenCommand, tokens)
      .pipe(catchError(error => throwError(() => new RpcException(error.response))))
  }
}
