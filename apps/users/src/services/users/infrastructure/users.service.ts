import { Injectable } from '@nestjs/common';
import {
  UserCreateCommand,
  UserDeleteCommand,
  UserFindManyCommand,
  UserFindOneCommand,
  UserUpdateCommand,
} from '../application';
import {
  IUserCreateHandler,
  IUserUpdateHandler,
  IUserDeleteHandler,
  IUserFindOneHandler,
  IUserFindManyHandler,
} from '../domain';

@Injectable()
export class UsersService {
  constructor(
    private readonly userCreateHandler: IUserCreateHandler,
    private readonly userUpdateHandler: IUserUpdateHandler,
    private readonly userDeleteHandler: IUserDeleteHandler,
    private readonly userFindOneHandler: IUserFindOneHandler,
    private readonly userFindManyHandler: IUserFindManyHandler,
  ) {}
  create(command: UserCreateCommand) {
    return this.userCreateHandler.execute(command);
  }

  findMany(command: UserFindManyCommand) {
    return this.userFindManyHandler.execute(command);
  }

  findOne(command: UserFindOneCommand) {
    return this.userFindOneHandler.execute(command);
  }

  update(command: UserUpdateCommand) {
    return this.userUpdateHandler.execute(command);
  }

  delete(command: UserDeleteCommand) {
    return this.userDeleteHandler.execute(command);
  }
}
