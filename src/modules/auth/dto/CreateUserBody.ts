import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsEmail, MinLength, Matches, IsString } from 'class-validator';

@Exclude()
export class CreateUserAdapter
  extends UseCaseValidatableAdapter
{
  @Expose()
  @IsString()
  public username: string;

  @Expose()
  @IsEmail()
  public email: string;

  @Expose()
  @IsString()
  @MinLength(4)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  public password: string;
}
