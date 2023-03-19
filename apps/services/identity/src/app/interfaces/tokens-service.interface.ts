import { Claims, TokenPair } from '@vsp/services/common';

export const TOKENS_SERVICE_TOKEN: string = 'TOKENS_SERVICE_TOKEN';

export interface ITokensService {
  signToken(user: Claims): Promise<TokenPair>,
  refreshToken(tokens: TokenPair): Promise<TokenPair>
}
