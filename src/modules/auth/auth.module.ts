import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { ProvideCustomRepository } from '../../common/utils/customRepository.util';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository, ApiKeyRepository } from './repository';
import { User, ApiKey } from './entities';
import { JwtConfig } from '../../config';
import {
  JwtAccessTokenStrategy,
  LocalStrategy,
  ApiKeyStrategy,
  JwtRefreshTokenStrategy,
} from './passport';

const providerRepository = [
  ProvideCustomRepository(User, UserRepository),
  ProvideCustomRepository(ApiKey, ApiKeyRepository),
];

@Module({
  imports: [PassportModule, JwtModule.register(JwtConfig)],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    LocalStrategy,
    ApiKeyStrategy,
    ...providerRepository,
  ],
})
export class AuthModule {}
