import { Transform, TransformFnParams } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class ResetPasswordDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  public email: string;

  @IsDefined()
  @IsNotEmpty()
  public password: string;

  @IsDefined()
  @IsNotEmpty()
  public confirmPassword: string;

  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  public resetToken: string;
}
