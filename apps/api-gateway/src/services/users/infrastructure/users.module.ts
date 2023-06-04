import { IClientProxy, ServiceNameEnum } from '@app/microservices';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { EnvConfig } from '../../../config';
import {
  UserCreateHandler,
  UserDeleteHandler,
  UserFindManyHandler,
  UserFindOneHandler,
  UserUpdateHandler,
} from '../application';
import {
  IUserCreateHandler,
  IUserDeleteHandler,
  IUserFindManyHandler,
  IUserFindOneHandler,
  IUserUpdateHandler,
} from '../domain';
import { IUsersService } from '../domain/service.interface';
import { UsersController } from './tcp';
import { UsersService } from './users.service';

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
    {
      provide: IUserCreateHandler,
      useClass: UserCreateHandler,
    },
    {
      provide: IUserDeleteHandler,
      useClass: UserDeleteHandler,
    },
    {
      provide: IUserUpdateHandler,
      useClass: UserUpdateHandler,
    },
    {
      provide: IUserFindOneHandler,
      useClass: UserFindOneHandler,
    },
    {
      provide: IUserFindManyHandler,
      useClass: UserFindManyHandler,
    },
  ],
  exports: [],
})
export class UsersModule {}
