import { Module } from '@nestjs/common';
import { LoggerModule as LoggerPinoModule } from 'nestjs-pino';
import { EnvironmentConfigModule } from '../../config';
import { ConfigurationProvider, configProviders } from './configuration.provider';

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
