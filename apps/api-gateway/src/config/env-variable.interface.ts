import { EnvironmentEnum } from '@app/common';

export type EnvConfig = {
  NODE_ENV: EnvironmentEnum;
  PORT: number;
  USE_COMPRESSION: boolean;
  USE_SWAGGER: boolean;
  LOG_LEVEL: string;
  APP_VERSION: string;

  USERS_HOST: string;
  USERS_PORT: number;

  DEPARTMENTS_HOST: string;
  DEPARTMENTS_PORT: number;
};
