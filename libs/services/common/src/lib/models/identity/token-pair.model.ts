export class TokenPair {
  public accessToken: string;
  public refreshToken: string;

  constructor(args: any) {
    Object.assign(this, args);
  }
}
