import { IsDefined, IsJWT, IsNotEmpty, IsUUID } from 'class-validator';

export class RefreshTokenRequestDto {
  @IsDefined()
  @IsNotEmpty()
  @IsJWT()
  public accessToken: string;

  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  public refreshToken: string;
}
