import { Module } from '@nestjs/common';
import { EnvironmentConfigModule as ConfigModule } from './infrastructure/config';
import { UsersModule } from './services';
import { DatabaseModule, LoggerModule } from './infrastructure';

@Module({
  imports: [ConfigModule, UsersModule, LoggerModule, DatabaseModule],
})
export class AppModule {}
