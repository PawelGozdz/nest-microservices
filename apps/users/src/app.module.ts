import { Module } from '@nestjs/common';
import { EnvironmentConfigModule as ConfigModule } from './config';
import { UsersModule } from './services';
import { LoggerModule } from './core';
import { DatabaseModule } from './database';

@Module({
  imports: [ConfigModule, UsersModule, LoggerModule, DatabaseModule],
})
export class AppModule {}
