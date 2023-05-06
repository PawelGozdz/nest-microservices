import { readFileSync } from 'fs';
import { join } from 'path';

import { NestApplicationOptions } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config as configuration } from './src/config';

export const nestApplicationOptions: NestApplicationOptions = {
  bufferLogs: true,
};

const appPath = 'apps/users';
const certPath = 'certs';

const tlsOptions = {
  rejectUnauthorized: true,
  ca: readFileSync(join(process.cwd(), appPath, certPath, 'ca.key')),
  key: readFileSync(join(process.cwd(), appPath, certPath, 'server.key')),
  cert: readFileSync(join(process.cwd(), appPath, certPath, 'server.crt')),
};

export const nestApplicationMicroserviceOptions = (): MicroserviceOptions => {
  const config = configuration();
  return {
    transport: Transport.TCP,
    options: {
      host: config.get('USERS_HOST'),
      port: config.get('USERS_PORT'),
      tlsOptions: config.get('USERS_TLS_CONNECTION') && tlsOptions,
    },
  };
};
