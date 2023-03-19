import { ClaimDto } from '../../dtos/identity/claim.dto';

export class UserDetails {
  public id: string;
  public username: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public accountId: string;
  public tenantId: string;
  public roles: string[];
  public claims: ClaimDto[];

  constructor(args: any) {
    Object.assign(this, args);
  }
}
