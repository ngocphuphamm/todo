import {
  ValidateIf,
  MinLength,
  Matches,
  IsEmail,
  IsString,
  MaxLength,
} from 'class-validator';

export default class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @ValidateIf((o) => o.email != '')
  public readonly email: string;

  @IsString()
  @MinLength(4, { message: 'Username must be at lueast 4 characters long' })
  @MaxLength(20, { message: 'Username must be at most 20 characters long' })
  public readonly username: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  public readonly password: string;
}
