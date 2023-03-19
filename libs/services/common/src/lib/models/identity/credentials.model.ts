export class Credentials {
  public username: string;
  public password: string;
  public clientId: string;

  constructor(args: any) {
    Object.assign(this, args);
  }
}
