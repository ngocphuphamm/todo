import {
  Global,
  Module,
  OnApplicationBootstrap,
  Provider,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { RateLimiterModule, RateLimiterGuard } from 'nestjs-rate-limiter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { HttpExceptionFilter } from '../../exceptionFilter';
import { RedisConfig, TypeOrmConfig, ApiConfig } from '../../config';
import { HttpLoggingInterceptor } from '../../interceptors';
const providers: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_GUARD,
    useClass: RateLimiterGuard,
  },
];

if (ApiConfig.LOG_ENABLE) {
  providers.push({
    provide: APP_INTERCEPTOR,
    useClass: HttpLoggingInterceptor,
  });
}

@Global()
@Module({
  imports: [
    RateLimiterModule.register(),
    TypeOrmModule.forRoot(TypeOrmConfig),
    RedisModule.forRoot({
      readyLog: true,
      config: RedisConfig,
    }),
  ],
  providers: providers,
  exports: [],
})
export class InfrastructureModule implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    initializeTransactionalContext();
  }
}
