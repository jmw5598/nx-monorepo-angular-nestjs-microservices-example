import { ConfirmEmailDto, Credentials, ForgotPasswordDto, ResetPasswordDto, 
  ResponseMessage, SimpleExistsQueryResponseDto, SimpleQueryRequestDto, UserDetails 
} from '@vsp/services/common';

export const USERS_SERVICE_TOKEN: string = 'USERS_SERVICE_TOKEN';

export interface IUsersService {
  validateUser(credentials: Credentials): Promise<UserDetails | null>
  resetPassword(resetPassword: ResetPasswordDto): Promise<ResponseMessage<void>>;
  doesEmailExist(query: SimpleQueryRequestDto): Promise<SimpleExistsQueryResponseDto>;
  doesUsernameExist(query: SimpleQueryRequestDto): Promise<SimpleExistsQueryResponseDto>;
  confirmEmail(confirmation: ConfirmEmailDto): Promise<ResponseMessage<void>>;
  forgotPassword(forgotPassword: ForgotPasswordDto): Promise<ResponseMessage<void>>;
}
