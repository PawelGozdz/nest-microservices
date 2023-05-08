import { Module } from '@nestjs/common';
import { EnvironmentConfigModule as ConfigModule } from './config';
import { DepartmentsModule } from './services';
import { LoggerModule } from './core';
import { DatabaseModule } from './database';
import { TcpModule } from './core/tcp';
import { MessageBrokerModule } from './core/message-broker';

@Module({
  imports: [
    ConfigModule,
    DepartmentsModule,
    LoggerModule,
    DatabaseModule,
    TcpModule,
    MessageBrokerModule,
  ],
})
export class AppModule {}
