import { Module } from '@nestjs/common';
import { IClientProxy, ServiceNameEnum } from '@app/microservices';
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

const handlers = [
  UserCreateHandler,
  UserUpdateHandler,
  UserDeleteHandler,
  UserFindOneHandler,
  UserFindManyHandler,
];

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
