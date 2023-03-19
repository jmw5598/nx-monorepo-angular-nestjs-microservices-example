import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateProfileDto {
  @IsDefined()
  @IsNotEmpty()
  public firstName: string;

  @IsDefined()
  @IsNotEmpty()
  public lastName: string;

  public summary: string;
  public avatarUrl: string;

  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  public address: CreateAddressDto;

  constructor(args: any) {
    Object.assign(this, args);
  }
}
