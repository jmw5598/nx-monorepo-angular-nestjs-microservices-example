import { IsNotEmpty } from 'class-validator';
import { BaseDto } from '../base.dto';
import { ProfileDto } from './profile.dto';
import { TenantDto } from './tenant.dto';

export class UserDto extends BaseDto {
  public username: string;
  public email: string;
  public profile: ProfileDto;
  public tenant: TenantDto;

  constructor(args: any) {
    super();
    Object.assign(this, {
      id: args?.id,
      createdAt: args?.createdAt,
      updatedAt: args?.updatedAt,
      username: args?.username,
      email: args?.email,
      tenant: new TenantDto(args?.tenant || {}),
      profile: new ProfileDto(args?.profile || {})
    } satisfies UserDto);
  }
}
