import { Module } from '@nestjs/common';
import { UsersModule } from './tcp/users/users.module';
import { EnvironmentConfigModule as ConfigModule } from './infrastructure/config';
import { LoggerModule } from './infrastructure/logger';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DefaultIfEmptyInterceptor } from './infrastructure';

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
