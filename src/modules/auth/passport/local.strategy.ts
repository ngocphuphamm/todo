import { AuthService } from '../auth.service';
import { UserPayload } from '../interface/payloads/user.payload';
import { Code } from '../../../common/code';
import { Exception } from '../../../common/exception';
import { CoreAssert } from '../../../common/utils/assert';
import { ApiConfig } from '../../../config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: ApiConfig.LOGIN_USERNAME_FIELD,
      passwordField: ApiConfig.LOGIN_PASSWORD_FIELD,
    });
  }

  public async validate(
    username: string,
    password: string,
  ): Promise<UserPayload> {
    const user: UserPayload = CoreAssert.notEmpty(
      await this.authService.validateUser(username, password),
      Exception.new({ code: Code.WRONG_CREDENTIALS_ERROR }),
    );
    return user;
  }
}
