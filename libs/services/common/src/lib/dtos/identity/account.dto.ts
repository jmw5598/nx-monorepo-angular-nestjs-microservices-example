import { BaseDto } from '../base.dto';

export class AccountDto extends BaseDto {
  public name: string;

  constructor(args: any) {
    super();
    Object.assign(this, {
      id: args?.id,
      createdAt: args?.createdAt,
      updatedAt: args?.updatedAt,
      name: args?.name
    } satisfies AccountDto);
  }
}
