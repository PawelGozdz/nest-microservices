import { NestApplicationOptions } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const nestApplicationOptions: NestApplicationOptions = {
  bufferLogs: true,
  bodyParser: false,
};

export const nestApplicationMicroserviceOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: 3112,
    retryAttempts: 3,
    retryDelay: 200,
  },
};
