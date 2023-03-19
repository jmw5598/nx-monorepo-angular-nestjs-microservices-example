import { IsDefined, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class ConfirmEmailDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  public confirmationToken: string;
}
