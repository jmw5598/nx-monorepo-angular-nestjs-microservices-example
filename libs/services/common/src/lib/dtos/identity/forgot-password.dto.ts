import { Transform, TransformFnParams } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  public email: string;
}
