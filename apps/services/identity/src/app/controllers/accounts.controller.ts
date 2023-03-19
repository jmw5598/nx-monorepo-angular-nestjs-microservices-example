import { BadRequestException, Controller, Inject, Logger, NotFoundException } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';

import { LoggerService } from '@vsp/services/logger';
import { 
  confirmEmailCommand, 
  ConfirmEmailDto, 
  doesEmailExist, 
  doesUsernameExist, 
  forgotPasswordCommand, 
  ForgotPasswordDto, 
  registerAccountCommand, 
  RegistrationDto, 
  resetPasswordCommand, 
  ResetPasswordDto, 
  ResponseMessage, 
  SimpleExistsQueryResponseDto, 
  SimpleQueryRequestDto, 
  UserDto} from '@vsp/services/common';

import { ACCOUNTSS_SERVICE_TOKEN, IAccountsService } from '../interfaces/accounts-service.interface';
import { IUsersService, USERS_SERVICE_TOKEN } from '../interfaces/users-service.interface';

@Controller()
export class AccountsController {
  @Inject(ACCOUNTSS_SERVICE_TOKEN)
  private readonly _accountsService: IAccountsService;

  @Inject(USERS_SERVICE_TOKEN)
  private readonly _usersService: IUsersService

  constructor(private readonly _logger: LoggerService) {
    this._logger.setContext(AccountsController.name);
  }
  
  @MessagePattern(registerAccountCommand)
  public async registerAccount(registrationDto: RegistrationDto): Promise<UserDto | null> {
    try {      
      const result: UserDto | null = await this._accountsService.register(registrationDto);

      if (!result) {
        throw new RpcException(
          new BadRequestException("Error creating new account! Please try again!")
        );
      }

      return result;
    } catch (error) {
      this._logger.error('Error registering account', error);
      throw error;
    }
    
  }

  @MessagePattern(forgotPasswordCommand)
  public async forgotPassword(forgotPassword: ForgotPasswordDto): Promise<ResponseMessage<void>> {
    try {
      return await this._usersService.forgotPassword(forgotPassword);
    } catch (error) {
      this._logger.error('Error requesting password reset', error);
      throw error;
    }
  }

  @MessagePattern(resetPasswordCommand)
  public async resetPassword(resetPassword: ResetPasswordDto): Promise<ResponseMessage<void>> {
    try {
      return await this._usersService.resetPassword(resetPassword);
    } catch (error) {
      this._logger.error('Error resetting password', error);
      throw error;
    }
  }

  @MessagePattern(confirmEmailCommand)
  public async confirmEmail(confirmEmail: ConfirmEmailDto): Promise<ResponseMessage<void>> {
    try {
      return await this._usersService.confirmEmail(confirmEmail);
    } catch (error) {
      this._logger.error('Error confirming email', error);
      throw error;
    }
  }

  @MessagePattern(doesEmailExist)
  public async doesEmailExist(query: SimpleQueryRequestDto): Promise<SimpleExistsQueryResponseDto> {
    try {
      return await this._usersService.doesEmailExist(query);
    } catch (error) {
      this._logger.error('Error confirming email', error);
      throw error;
    }
  }

  @MessagePattern(doesUsernameExist)
  public async doesUsernameExist(query: SimpleQueryRequestDto): Promise<SimpleExistsQueryResponseDto> {
    try {
      return await this._usersService.doesUsernameExist(query);
    } catch (error) {
      this._logger.error('Error confirming email', error);
      throw error;
    }
  }
}
