import { BaseDto } from '../base.dto';
import { UserDto } from './user.dto';

export class AddressDto extends BaseDto {
  public street: string;
  public street2: string;
  public city: string;
  public state: string;
  public zip: string;
  public country: string;

  constructor(args: any) {
    super();
    Object.assign(this, {
      id: args?.id,
      createdAt: args?.createdAt,
      updatedAt: args?.updatedAt,
      street: args?.street,
      street2: args?.street2,
      city: args?.city,
      state: args?.state,
      zip: args?.zip,
      country: args?.country
    } satisfies AddressDto);
  }
}