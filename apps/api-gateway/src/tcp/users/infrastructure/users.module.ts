import { readFileSync } from 'fs';
import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServiceNameEnum } from '@app/microservices';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  UserCreateHandler,
  UserDeleteHandler,
  UserFindManyHandler,
  UserFindOneHandler,
  UserUpdateHandler,
} from '../application';
import { IUsersService } from '../domain/users-service.interface';
import { EnvConfig } from '../../../config';
import { IClientProxy } from '../domain/client-proxy.interface';

const handlers = [
  UserCreateHandler,
  UserUpdateHandler,
  UserDeleteHandler,
  UserFindOneHandler,
  UserFindManyHandler,
];

const appPath = 'apps/api-gateway';
const certPath = 'certs';

const tlsOptions = {
  rejectUnauthorized: true,
  ca: readFileSync(join(process.cwd(), appPath, certPath, 'ca.crt')),
  key: readFileSync(join(process.cwd(), appPath, certPath, 'client.key')),
  cert: readFileSync(join(process.cwd(), appPath, certPath, 'client.crt')),
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
  providers: [
    {
      provide: IUsersService,
      useClass: UsersService,
    },
    {
      provide: IClientProxy,
      useValue: ClientProxy,
    },
    ...handlers,
  ],
  exports: [],
})
export class UsersModule {}
