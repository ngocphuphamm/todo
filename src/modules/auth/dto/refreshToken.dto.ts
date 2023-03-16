import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  public refreshToken: string;
}
