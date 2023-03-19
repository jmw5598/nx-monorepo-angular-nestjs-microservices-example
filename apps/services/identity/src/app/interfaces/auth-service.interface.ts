import { AuthenticatedUser, Credentials, TokenPair, UserDetails } from '@vsp/services/common';

export const AUTH_SERVICE_TOKEN: string = 'AUTH_SERVICE_TOKEN';

export interface IAuthService {
  signIn(user: UserDetails): Promise<AuthenticatedUser>,
  validateUser(credentials: Credentials): Promise<UserDetails | null>,
  refreshToken(tokens: TokenPair): Promise<TokenPair>
}
