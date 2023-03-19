import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { LoggerService } from '@vsp/services/logger';
import { 
  Credentials,
  signInCommand, 
  UserDetails, 
  validateUserCommand } from '@vsp/services/common';

import { AUTH_SERVICE_TOKEN, IAuthService } from '../interfaces/auth-service.interface';

@Controller()
export class AuthController {
  

  @Inject(AUTH_SERVICE_TOKEN)
  private readonly _authService: IAuthService;

  constructor(private readonly _logger: LoggerService) {
    this._logger.setContext(AuthController.name);
  }

  @MessagePattern(validateUserCommand)
  public async validateUser(credentials: Credentials): Promise<any> {
    try {
      return await this._authService.validateUser(credentials);
    } catch (error) {
      this._logger.error('Error validating user', error);
      return error;
    }
  }

  @MessagePattern(signInCommand)
  public async signIn(user: UserDetails): Promise<any> {
    try {
      return await this._authService.signIn(user);
    } catch (error) {
      this._logger.error('Error signing in user', error);
      throw error;
    }
  }
}
