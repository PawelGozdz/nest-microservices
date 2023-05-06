import { Injectable, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentEnum } from '@app/common';
import { Request } from 'express';
import { Params } from 'nestjs-pino';
import { EnvConfig } from '../../config';

@Injectable()
export class ConfigurationProvider {
  constructor(private readonly configService: ConfigService<EnvConfig>) {}

  getLoggerOptions() {
    const nonProductionLoggerOptions: Params = {
      pinoHttp: {
        base: null,
        autoLogging: false,
        level: this.configService.get('LOG_LEVEL'),
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: true,
            messageFormat: '[{context}] {msg}',
            ignore: 'req,context',
          },
        },
        formatters: {
          log: (object) => {
            return { ...object };
          },
        },
      },
    };

    const productionLoggerOptions: Params = {
      pinoHttp: {
        autoLogging: {
          ignore: (req) => (req as Request).originalUrl === '/',
        },
        level: this.configService.get('LOG_LEVEL'),
        formatters: {
          log: (object) => {
            return { ...object };
          },
        },
      },
    };

    return this.configService.get('NODE_ENV') === EnvironmentEnum.PRODUCTION
      ? productionLoggerOptions
      : nonProductionLoggerOptions;
  }
}

@Injectable()
export class AppLoggerConfig {
  environment: EnvironmentEnum;
  loggerOptions: Params;

  constructor(
    private readonly configService: ConfigService<EnvConfig>,
    private readonly configurationProvider: ConfigurationProvider,
  ) {
    this.environment = this.configService.get('NODE_ENV') as EnvironmentEnum;
    this.loggerOptions = this.configurationProvider.getLoggerOptions();
  }
}

export const configProviders: Provider[] = [AppLoggerConfig, ConfigurationProvider];
