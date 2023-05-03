import { readFileSync } from 'fs';
import { join } from 'path';

import { NestApplicationOptions } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const nestApplicationOptions: NestApplicationOptions = {
  bufferLogs: true,
  bodyParser: false,
};

const tlsOptions = {
  rejectUnauthorized: true,
  ca: readFileSync(join(process.cwd(), 'apps/users/certs', 'ca.key')),
  key: readFileSync(join(process.cwd(), 'apps/users/certs', 'server.key')),
  cert: readFileSync(join(process.cwd(), 'apps/users/certs', 'server.crt')),
};

export const nestApplicationMicroserviceOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: 3112,
    retryAttempts: 3,
    retryDelay: 200,
    tlsOptions,
  },
};
