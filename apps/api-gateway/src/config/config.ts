import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './env-variable.interface';

// This is for scenario, when service injection is not possible
export const config = function () {
  return new ConfigService<EnvConfig>();
};
