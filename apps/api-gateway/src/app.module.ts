import { Module } from '@nestjs/common';
import { EnvironmentConfigModule as ConfigModule } from './infrastructure/config';
import { LoggerModule } from './infrastructure/logger';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DefaultIfEmptyInterceptor } from './infrastructure';
import { UsersModule } from './tcp';

@Module({
  imports: [ConfigModule, LoggerModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DefaultIfEmptyInterceptor,
    },
  ],
})
export class AppModule {}
