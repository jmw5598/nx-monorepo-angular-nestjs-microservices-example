import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { MoreThan } from 'typeorm';

import { v4 as uuid } from 'uuid';

import { 
  Client, 
  ConfirmEmailDto, 
  Credentials, 
  ForgotPasswordDto, 
  HashingUtils, 
  ResetPasswordDto, 
  ResponseMessage, 
  ResponseStatus, 
  SimpleExistsQueryResponseDto, 
  SimpleQueryRequestDto, User, 
  UserDetails } from '@vsp/services/common';

import { LoggerService } from '@vsp/services/logger';


import { CLIENTS_REPOSITORY_TOKEN, IClientsRepository } from '../interfaces/clients-repository.interface';
import { IUsersRepository, USERS_REPOSITORY_TOKEN } from '../interfaces/users-repository.interface';
import { IUsersService } from '../interfaces/users-service.interface';
import { canUserAccessClient } from '../utils/identity.utils';

@Injectable()
export class UsersService implements IUsersService {
  @Inject(USERS_REPOSITORY_TOKEN)
  private readonly _usersRepository: IUsersRepository;

  @Inject(CLIENTS_REPOSITORY_TOKEN)
  private readonly _clientsRepository: IClientsRepository;
  
  constructor(private readonly _logger: LoggerService) {
    this._logger.setContext(UsersService.name);
  }

  public async validateUser(credentials: Credentials): Promise<UserDetails | null> {
    try {
      // Finds user by username with email confirmed,
      // that isn't locked out and whose tenant isnt locked out.
      const user: User | null = await this._usersRepository
        .findByCondition({ 
          relations: ['roles', 'profile', 'tenant', 'tenant.account'], 
          where: { 
            username: credentials.username,
            isEmailConfirmed: true,
            isLockedOut: false,
            tenant: {
              isLockedOut: false
            }
        }});

      // Validate that the user exists.
      if (!user) {
        return null;
      }
      
      // Validate that user can access that client.
      const client: Client | null = await this._clientsRepository
        .findByCondition({ relations: ['requiredRoles'], where: { indentifier: credentials.clientId }});
      
      if (!canUserAccessClient(user, client)) {
        return null;
      }
      
      // Validate that the users password is correct.
      if (!HashingUtils.compare(credentials.password, user.password)) {
        return null;
      }

      return new UserDetails({
        id: user.id,
        username: user?.username || 'unknown',
        email: user?.email || 'unknown',
        firstName: user?.profile?.firstName || 'unknown',
        lastName: user?.profile?.lastName || 'unknown',
        tenantId: user?.tenant?.identifier || 'unknown',
        accountId: user?.tenant?.account?.identifier || 'unknown',
        roles: user.roles?.map(role => role.name) || [],
        claims: []
      } satisfies UserDetails);
    } catch (error) {
      this._logger.error('Error validating user', error);
      throw error;
    }
  }

  public async resetPassword(resetPassword: ResetPasswordDto): Promise<ResponseMessage<void>> {
    try {
      const user: User | null = await this._usersRepository
        .findByCondition({ 
          where: { 
            email: resetPassword.email,
            passwordResetToken: resetPassword.resetToken,
            passwordResetTokenExpiration: MoreThan(new Date().toISOString())
          } as any,
        });

      if (!user) {
        throw new RpcException(
          new UnauthorizedException("Error resetting password!")
        );
      }

      user.password = HashingUtils.hash(resetPassword.password);
      user.passwordResetTokenExpiration = new Date();
      await this._usersRepository.save(user);

      return new ResponseMessage({
        status: ResponseStatus.SUCCESS,
        message: 'You successfully reset your password!',
        payload: null
      } satisfies ResponseMessage<void>);
    } catch (error) {
      this._logger.error('Error resetting password!', error);
      throw error;
    }
  }

  public async doesEmailExist(query: SimpleQueryRequestDto): Promise<SimpleExistsQueryResponseDto> {
    try {
      const user: User | null = await this._usersRepository
        .findByCondition({ 
          where: { email: query?.query?.trim()?.toLowerCase() }
        });
      
      if (!user) {
        throw new RpcException(
          new NotFoundException("Email does not exist!")
        );
      }
      
      return new SimpleExistsQueryResponseDto({ exist: true });
    } catch (error) {
      this._logger.error('Error checking if email exists!', error);
      throw error;
    }
  }

  public async doesUsernameExist(query: SimpleQueryRequestDto): Promise<SimpleExistsQueryResponseDto> {
    try {
      const user: User | null = await this._usersRepository
        .findByCondition({ 
          where: { username: query?.query?.trim()?.toLowerCase() }
        });
      
      if (!user) {
        throw new RpcException(
          new NotFoundException("Username does not exist!")
        );
      }

      return new SimpleExistsQueryResponseDto({ exist: true });
    } catch (error) {
      this._logger.error('Error checking if username exists!', error);
      throw error;
    }
  }

  public async confirmEmail(confirmation: ConfirmEmailDto): Promise<ResponseMessage<void>> {
    try {
      const user: User | null = await this._usersRepository
        .findByCondition({ 
          where: { 
            email: confirmation?.email?.trim()?.toLowerCase() || '',
            emailConfirmationToken: confirmation?.confirmationToken,
            emailConfirmationTokenExpiration: MoreThan(new Date().toISOString())
          } as any
        });
      
      if (!user) {
        throw new RpcException(
          new BadRequestException("Confirmation has either expired or is invalid!")
        );
      }

      user.emailConfirmationTokenExpiration = new Date();
      user.isEmailConfirmed = true;
      await this._usersRepository.save(user);

      return new ResponseMessage<void>({
        status: ResponseStatus.SUCCESS,
        message: 'You successfully confirmed your email!',
        payload: null
      });
    } catch (error) {
      this._logger.error('Error confirming email!', error);
      throw error;
    }
  }

  public async forgotPassword(forgotPassword: ForgotPasswordDto): Promise<ResponseMessage<void>> {
    try {
      const user: User | null = await this._usersRepository
        .findByCondition({ 
          where: { 
            email: forgotPassword?.email?.trim()?.toLowerCase() || ''
          } as any
        });

      if (user) {
        // Set new expiration 24 hours from now.
        var passwordResetTokenExpiration = new Date();
        passwordResetTokenExpiration.setHours(passwordResetTokenExpiration.getHours() + 24)

        // Save the user
        user.passwordResetToken = uuid();
        user.passwordResetTokenExpiration = passwordResetTokenExpiration;
        await this._usersRepository.save(user);
      }

      return new ResponseMessage<void>({
        status: ResponseStatus.SUCCESS,
        message: 'You should receive an email to reset your password shortly!',
        payload: null
      });
    } catch (error) {
      this._logger.error('Error issuing reset password request!', error);
      throw error;
    }
  }
}
