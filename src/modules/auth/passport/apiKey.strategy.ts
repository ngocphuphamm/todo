import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { Code } from '../../../common/code';
import { Exception } from '../../../common/exception';
import { CoreAssert } from '../../../common/utils/assert';
import { Permissions, StatusKey } from '../../../enums/apiKey.enum';
import { AuthService } from '../auth.service';
import {
  API_KEY_HEADER,
  API_KEY_PREFIX,
} from '../../../common/constants/apiKey';
import { ApiKey } from '../entities';

@Injectable()
export default class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        header: API_KEY_HEADER,
        prefix: API_KEY_PREFIX,
      },
      false,
    );
  }

  public async validate(keyValue: string): Promise<ApiKey> {
    const apiKey: ApiKey = CoreAssert.notEmpty(
      await this.authService.getApiKey({ keyValue: keyValue }),
      Exception.new({ code: Code.UNAUTHORIZED_ERROR }),
    );

    const status = apiKey.status.toLowerCase();
    const permissions = apiKey.permissions.toLowerCase();
    if (
      status === StatusKey.ACTIVE.toLowerCase() &&
      (permissions === Permissions.GENERAL.toLowerCase() ||
        permissions === Permissions.VIP.toLowerCase())
    ) {
      return apiKey;
    }
    throw Exception.new({ code: Code.UNAUTHORIZED_ERROR });
  }
}
