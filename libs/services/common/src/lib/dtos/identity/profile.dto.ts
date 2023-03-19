import { BaseDto } from '../base.dto';
import { AddressDto } from './address.dto';

export class ProfileDto extends BaseDto {
  public firstName: string;
  public lastName: string;
  public summary: string;
  public avatarUrl: string;
  public address: AddressDto;

  constructor(args: any) {
    super();
    Object.assign(this, {
      id: args?.id,
      createdAt: args?.createdAt,
      updatedAt: args?.updatedAt,
      firstName: args?.firstName,
      lastName: args?.lastName,
      summary: args?.summary,
      avatarUrl: args?.avatarUrl,
      address: new AddressDto(args?.address || {})
    } satisfies ProfileDto);
  }
}
