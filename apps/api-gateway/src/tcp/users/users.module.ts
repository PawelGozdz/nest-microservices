import { readFileSync } from 'fs';
import { join } from 'path';

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceNameEnum } from '@app/microservices';
import { EnvConfig } from '../../infrastructure/config';
import { ConfigService } from '@nestjs/config';
import { UserCreateHandler } from './commands/create/user-create.handler';
import {
  UserDeleteHandler,
  UserFindManyHandler,
  UserFindOneHandler,
  UserUpdateHandler,
} from './commands';

const handlers = [
  UserCreateHandler,
  UserDeleteHandler,
  UserFindManyHandler,
  UserFindOneHandler,
  UserUpdateHandler,
];

const tlsOptions = {
  rejectUnauthorized: false,
  ca: readFileSync(join(__dirname, '../../..', 'apps/api-gateway/certs', 'ca.crt')),
  key: readFileSync(join(__dirname, '../../..', 'apps/api-gateway/certs', 'client.key')),
  cert: readFileSync(join(__dirname, '../../..', 'apps/api-gateway/certs', 'client.crt')),
};

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ServiceNameEnum.USERS,
        useFactory: (config: ConfigService<EnvConfig>) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('USERS_HOST'),
            port: config.get('USERS_PORT'),
            tlsOptions: config.get('USERS_TLS_CONNECTION') && tlsOptions,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...handlers],
  exports: [UsersService],
})
export class UsersModule {}
