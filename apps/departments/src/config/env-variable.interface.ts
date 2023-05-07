import { EnvironmentEnum } from '@app/common';

export type EnvConfig = {
  NODE_ENV: EnvironmentEnum;
  PORT: number;
  USE_COMPRESSION: boolean;
  USE_SWAGGER: boolean;
  LOG_LEVEL: string;
  APP_VERSION: string;
  TARGET_APP: string;

  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;

  DEPARTMENTS_HOST: string;
  DEPARTMENTS_PORT: number;
  DEPARTMENTS_TLS_CONNECTION: boolean;

  RABBIT_MQ_URI: string;
};
