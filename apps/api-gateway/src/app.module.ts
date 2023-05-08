import { Module } from '@nestjs/common';
import { EnvironmentConfigModule as ConfigModule } from './config';
import { LoggerModule } from './core/logger';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DefaultIfEmptyInterceptor } from './core';
import { UsersModule } from './tcp';
import { DepartmentsModule } from './tcp/departments/infrastructure';

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
