import { Module } from '@nestjs/common';
import { LoggerModule as LoggerPinoModule } from 'nestjs-pino';
import { ConfigurationProvider, configProviders } from './configuration.provider';
import { EnvironmentConfigModule } from '../../config';

@Module({
  imports: [
    EnvironmentConfigModule,
    LoggerPinoModule.forRootAsync({
      providers: [...configProviders],
      inject: [ConfigurationProvider],
      useFactory: (config: ConfigurationProvider) => config.getLoggerOptions(),
    }),
  ],
})
export class LoggerModule {}
