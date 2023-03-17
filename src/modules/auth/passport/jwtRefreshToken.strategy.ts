import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../auth.service';
import { Exception } from '../../../common/exception';
import { CoreAssert } from '../../../common/utils/assert';
import { User } from '../entities';
import { ApiConfig } from '../../../config';
import { JwtPayload } from '../interfaces/payloads/jwt.payload';
import { UserPayload } from '../interfaces/payloads/user.payload';
import { Code } from '../../../common/code/index';
@Injectable()
export default class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.body?.refreshToken;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: ApiConfig.ACCESS_REFRESH_TOKEN_SECRET,
    });
  }

  public async validate(payload: JwtPayload): Promise<UserPayload> {
    const user: User = CoreAssert.notEmpty(
      await this.authService.getUser({ id: payload.id }),
      Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'Invalid Refresh Token',
      }),
    );
    return {
      id: user.id,
      email: user.email,
    };
  }
}
