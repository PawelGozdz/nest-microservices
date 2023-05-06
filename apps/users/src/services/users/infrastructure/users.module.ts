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

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
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
  ],
})
export class UsersModule {}
