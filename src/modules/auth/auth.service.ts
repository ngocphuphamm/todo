import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  RedisService,
  DEFAULT_REDIS_NAMESPACE,
} from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

import { CreateUserDto } from './dto';
import { UserRepository, ApiKeyRepository } from './repository';
import { User } from './entities';
import { CoreAssert } from '../../common/utils/assert';
import { Exception } from '../../common/exception';
import { Code } from '../../common/code';
import { Optional, Nullable } from '../../common/types';
import { JwtPayload } from './interface/payloads/jwt.payload';
import { UserPayload } from './interface/payloads/user.payload';
import { LoggedInUser } from './interface/payloads/user.payload';
import { TIME_TO_LIVE_REDIS } from '../../constants/redis';
import { ApiKey } from './entities';

@Injectable()
export class AuthService {
  private readonly redis: Redis;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: ApiKeyRepository,

    private readonly jwtService: JwtService,

    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient();
  }

  public async getApiKey(by: { keyValue: string }): Promise<Optional<ApiKey>> {
    return this.apiKeyRepository.findApiKey(by);
  }

  public async create(newUser: CreateUserDto): Promise<JwtPayload> {
    const doesUserExist: number = await this.userRepository.countUsers({
      email: newUser.email,
    });
    CoreAssert.isFalse(
      !!doesUserExist,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'User already exists',
      }),
    );

    const user: User = await this.userRepository.addUser(newUser);
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }

  public async login(userLogin: UserPayload): Promise<LoggedInUser> {
    const user: Optional<User> = await this.getUser({ id: userLogin.id });
    if (!user)
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'Invalid user',
      });

    const [accessToken, refreshToken] = await this.generateToken(user);

    return {
      id: userLogin.id,
      accessToken,
      refreshToken,
    };
  }

  public async refreshToken(refreshToken: string): Promise<string> {
    const verifiedJWt = await this.jwtService.verify(refreshToken);
    await CoreAssert.isTrue(
      verifiedJWt,
      Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'Invalid refresh token',
      }),
    );

    await this.isTokenBlacklisted(refreshToken);

    const userId = await this.redis.get(refreshToken);
    await CoreAssert.notEmpty(
      userId,
      Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'refresh token doesn" t exist in Redis',
      }),
    );

    const user: Optional<User> = await this.getUser({ id: userId });
    await CoreAssert.notEmpty(
      user,
      Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'user not exist',
      }),
    );

    const accessToken = await this.jwtService.sign({
      id: user.id,
      email: user.email,
      username: user.username,
    });
    return accessToken;
  }

  public async logout(refreshToken: string): Promise<void> {
    const blacklisted = await this.isTokenBlacklisted(refreshToken);
    if (!blacklisted) {
      await this.redis.set(refreshToken, 'blacklisted');
      await this.redis.expire(refreshToken, TIME_TO_LIVE_REDIS);
    }
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<Nullable<UserPayload>> {
    const user: Optional<User> = await this.userRepository.findUser({
      email: email,
    });

    if (!user) return null;

    const isPasswordValid: boolean = await user.comparePassword(password);
    if (!isPasswordValid) return null;

    return {
      id: user.id,
      email: user.email,
    };
  }

  public async getUser(by: { id: string }): Promise<Optional<User>> {
    return this.userRepository.findUser(by);
  }

  private async generateToken(user: User) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    // Store the refresh token in Redis
    await this.redis.set(refreshToken, user.id, 'PX', TIME_TO_LIVE_REDIS);
    return [accessToken, refreshToken];
  }

  private async isTokenBlacklisted(token: string): Promise<boolean> {
    const tokenBlacklisted: string = await this.redis.get(token);
    if (tokenBlacklisted === 'blacklisted') {
      throw Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'Token in blacklist ',
      });
    }
    return false;
  }
}
