import { AuthenticatedStatus } from './authenticated-status.enum';
import { TokenPair } from './token-pair.model';

export interface AuthenticatedUser {
  status: AuthenticatedStatus,
  tokens: TokenPair
}
