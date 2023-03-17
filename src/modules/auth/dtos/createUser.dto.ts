import {
  ValidateIf,
  MinLength,
  Matches,
  IsEmail,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email' })
  @ValidateIf((o) => o.email != '')
  public readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(4, { message: 'Username must be at lueast 4 characters long' })
  @MaxLength(20, { message: 'Username must be at most 20 characters long' })
  public readonly username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  public readonly password: string;
}
