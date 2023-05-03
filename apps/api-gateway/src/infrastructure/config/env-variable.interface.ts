import { EnvironmentEnum } from '@app/common';

export type EnvConfig = {
  NODE_ENV: EnvironmentEnum;
  PORT: number;
  USE_COMPRESSION: boolean;
  USE_SWAGGER: boolean;
  DB_NAME: string;
  DB_URI: string;
  LOG_LEVEL: string;
  APP_VERSION: string;

  USERS_HOST: string;
  USERS_PORT: number;
  USERS_TLS_CONNECTION: boolean;
};
