import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module, Provider } from '@nestjs/common';

import { ProvideCustomRepository } from '../../common/utils/customRepository.util';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository, ApiKeyRepository } from './repository';
import { User, ApiKey } from './entities';
import { JwtConfig } from '../../config';
import { JwtStrategy, LocalStrategy, ApiKeyStrategy } from './passport';

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
    JwtStrategy,
    LocalStrategy,
    ApiKeyStrategy,
    ...providerRepository,
  ],
})
export class AuthModule {}
