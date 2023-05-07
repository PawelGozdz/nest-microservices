import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  UserCreateHandler,
  UserDeleteHandler,
  UserFindManyHandler,
  UserFindOneHandler,
  UserUpdateHandler,
} from '../application';
import {
  IUserDeleteHandler,
  IUserUpdateHandler,
  IUserCreateHandler,
  IUserFindOneHandler,
  IUserFindManyHandler,
  IUsersService,
  IUsersQueryRepository,
  IUsersCommandRepository,
} from '../domain';
import { UsersCommandRepository, UsersQueryRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { IClientProxy, ServiceNameEnum, UsersEventPatternEnum } from '@app/microservices';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from 'apps/users/src/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.registerAsync([
      {
        name: ServiceNameEnum.RABBIT_MQ,
        useFactory: (configService: ConfigService<EnvConfig, true>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URI')],
            queue: UsersEventPatternEnum.USER_CREATED,
            noAck: false,
            persistent: true,
          },
        }),
        inject: [ConfigService],
      },
      {
        name: ServiceNameEnum.RABBIT_MQ,
        useFactory: (configService: ConfigService<EnvConfig, true>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URI')],
            queue: UsersEventPatternEnum.USER_UPDATED,
            noAck: false,
            persistent: true,
          },
        }),
        inject: [ConfigService],
      },
      {
        name: ServiceNameEnum.RABBIT_MQ,
        useFactory: (configService: ConfigService<EnvConfig, true>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URI')],
            queue: UsersEventPatternEnum.USER_DELETED,
            noAck: false,
            persistent: true,
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
      provide: IUserCreateHandler,
      useClass: UserCreateHandler,
    },
    {
      provide: IUserUpdateHandler,
      useClass: UserUpdateHandler,
    },
    {
      provide: IUserDeleteHandler,
      useClass: UserDeleteHandler,
    },
    {
      provide: IUserFindOneHandler,
      useClass: UserFindOneHandler,
    },
    {
      provide: IUserFindManyHandler,
      useClass: UserFindManyHandler,
    },
    {
      provide: IUsersQueryRepository,
      useClass: UsersQueryRepository,
    },
    {
      provide: IUsersCommandRepository,
      useClass: UsersCommandRepository,
    },
    {
      provide: IClientProxy,
      useValue: ClientProxy,
    },
  ],
})
export class UsersModule {}
