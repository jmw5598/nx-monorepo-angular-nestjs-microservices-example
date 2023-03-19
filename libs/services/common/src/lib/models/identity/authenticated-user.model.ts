import { AuthenticatedStatus } from './authenticated-status.enum'
import { TokenPair } from './token-pair.model';

export class AuthenticatedUser {
  public status: AuthenticatedStatus;
  public tokens: TokenPair

  constructor(args: any) {
    Object.assign(this, args);
  }
}
