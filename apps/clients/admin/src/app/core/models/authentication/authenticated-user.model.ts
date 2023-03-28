import { AuthenticatedStatus } from './authenticated-status.enum';

export interface AuthenticatedUser {
  status: AuthenticatedStatus,
  accessToken: string,
  refreshToken: string
}
