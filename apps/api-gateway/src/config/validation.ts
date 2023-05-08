import * as Joi from 'joi';
import { EnvConfig } from './env-variable.interface';
import { EnvironmentEnum } from '@app/common';

export const validationSchema = Joi.object<EnvConfig, true, EnvConfig>({
  NODE_ENV: Joi.string()
    .required()
    .valid(...Object.values(EnvironmentEnum)),
  PORT: Joi.number().required(),
  USE_SWAGGER: Joi.boolean().default(false),
  USE_COMPRESSION: Joi.boolean().required().default(true),

  LOG_LEVEL: Joi.string().required().default('info'),
  APP_VERSION: Joi.string().required(),

  USERS_HOST: Joi.string().required(),
  USERS_PORT: Joi.number().required(),

  DEPARTMENTS_HOST: Joi.string().required(),
  DEPARTMENTS_PORT: Joi.number().required(),
});
