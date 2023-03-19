import { Body, Controller, Head, HttpCode, HttpStatus, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';

import { LoggerService } from '@vsp/services/logger';

import { 
  confirmEmailCommand, 
  ConfirmEmailDto, 
  doesEmailExist, 
  doesUsernameExist, 
  forgotPasswordCommand, 
  ForgotPasswordDto, 
  IDENTITY_SERVICE_TOKEN, 
  registerAccountCommand, 
  RegistrationDto, 
  resetPasswordCommand, 
  ResetPasswordDto, 
  SimpleQueryRequestDto, 
  UserDto } from '@vsp/services/common';

@Controller('accounts')
export class AccountsController {
  @Inject(IDENTITY_SERVICE_TOKEN)
  private readonly _identityServiceClient: ClientProxy;
  
  constructor(private readonly _logger: LoggerService) {
    this._logger.setContext(AccountsController.name);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public registerAccount(@Body() registrationDto: RegistrationDto): Observable<UserDto> {
    return this._identityServiceClient
      .send(registerAccountCommand, registrationDto)
      .pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  public forgotPassword(@Body() forgotPassword: ForgotPasswordDto): Observable<any> {
    return this._identityServiceClient
      .send(forgotPasswordCommand, forgotPassword)
      .pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  public resetPassword(@Body() resetPassword: ResetPasswordDto): Observable<any> {
    return this._identityServiceClient
      .send(resetPasswordCommand, resetPassword)
      .pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @Post('confirm-email')
  @HttpCode(HttpStatus.OK)
  public confirmEmail(@Body() confirmEmail: ConfirmEmailDto): Observable<any> {
    return this._identityServiceClient
      .send(confirmEmailCommand, confirmEmail)
      .pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @Head('usernames')
  @HttpCode(HttpStatus.NO_CONTENT)
  public doesUsernameExist(@Query('query') username: string): Observable<any> {
    return this._identityServiceClient
      .send(doesUsernameExist, new SimpleQueryRequestDto({ query: username }))
      .pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }

  @Head('emails')
  @HttpCode(HttpStatus.NO_CONTENT)
  public doesEmailExist(@Query('query') email: string): Observable<any> {
    return this._identityServiceClient
      .send(doesEmailExist, new SimpleQueryRequestDto({ query: email }))
      .pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }
}
