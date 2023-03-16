import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { JwtPayload } from '../interface/payloads/jwt.payload';
import { UserPayload } from '../interface/payloads/user.payload';
import { Code } from '../../../common/code';
import { Exception } from '../../../common/exception';
import { CoreAssert } from '../../../common/utils/assert';
import { User } from '../entities';
import { ApiConfig } from '../../../config';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ApiConfig.ACCESS_TOKEN_SECRET,
    });
  }

  public async validate(payload: JwtPayload): Promise<UserPayload> {
    const user: User = CoreAssert.notEmpty(
      await this.authService.getUser({ id: payload.id }),
      Exception.new({ code: Code.UNAUTHORIZED_ERROR }),
    );
    return {
      id: user.id,
      email: user.email,
    };
  }
}
