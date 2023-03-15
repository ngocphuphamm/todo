import { Module } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProvideCustomRepository } from '../../common/utils/customRepository.util';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './auth.repository';
import { User } from './entities/user.entity';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    ProvideCustomRepository(User, UserRepository),
  ],
})
export class AuthModule {}
