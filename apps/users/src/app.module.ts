import { Module } from '@nestjs/common';
import { EnvironmentConfigModule as ConfigModule } from './config';
import { UsersModule } from './services';
import { LoggerModule } from './core';
import { DatabaseModule } from './database';
import { TcpModule } from './core/tcp';
import { MessageBrokerModule } from './core/message-broker';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    LoggerModule,
    DatabaseModule,
    TcpModule,
    MessageBrokerModule,
  ],
})
export class AppModule {}
