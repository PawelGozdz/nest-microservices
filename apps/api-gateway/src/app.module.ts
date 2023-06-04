import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EnvironmentConfigModule as ConfigModule } from './config';
import { DefaultIfEmptyInterceptor } from './core';
import { LoggerModule } from './core/logger';
import { DepartmentsModule, UsersModule } from './services';

@Module({
  imports: [ConfigModule, LoggerModule, UsersModule, DepartmentsModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DefaultIfEmptyInterceptor,
    },
  ],
})
export class AppModule {}
