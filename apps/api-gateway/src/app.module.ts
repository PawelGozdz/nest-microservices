import { Module } from '@nestjs/common';
import { UsersModule } from './tcp/users/users.module';
import { EnvironmentConfigModule as ConfigModule } from './config';
import { LoggerModule } from './logger';

@Module({
  imports: [ConfigModule, LoggerModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
