import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';
import { CreateUserDto } from './create-user.dto';

export class RegistrationDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateAccountDto)
  public account: CreateAccountDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateUserDto)
  public user: CreateUserDto;

  constructor(args: any) {
    Object.assign(this, args);
  }
}
