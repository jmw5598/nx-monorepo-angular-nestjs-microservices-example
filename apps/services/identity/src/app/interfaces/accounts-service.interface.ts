import { RegistrationDto, UserDto } from '@vsp/services/common';

export const ACCOUNTSS_SERVICE_TOKEN: string = 'ACCOUNTS_SERVICE_TOKEN';

export interface IAccountsService {
  register(registration: RegistrationDto): Promise<UserDto | null>
}
