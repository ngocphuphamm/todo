import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class RefreshTokenDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  public refreshToken: string;
}
