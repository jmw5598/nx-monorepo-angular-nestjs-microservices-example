import { BaseDto } from '../base.dto';
import { AccountDto } from './account.dto';

export class TenantDto extends BaseDto {
  public account: AccountDto;

  constructor(args: any) {
    super();
    Object.assign(this, {
      id: args?.id,
      createdAt: args?.createdAt,
      updatedAt: args?.updatedAt,
      account: new AccountDto(args?.account || {})
    } satisfies TenantDto);
  }
}
