import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUsersService } from '../domain/service.interface';
import {
  UserCreateCommand,
  UserDeleteCommand,
  UserFindManyCommand,
  UserFindOneCommand,
  UserUpdateCommand,
} from '../application';
import { IUser } from '@app/ddd';
import {
  IUserCreateHandler,
  IUserDeleteHandler,
  IUserFindManyHandler,
  IUserFindOneHandler,
  IUserUpdateHandler,
} from '../domain';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    private readonly userCreateHandler: IUserCreateHandler,
    private readonly userDeleteHandler: IUserDeleteHandler,
    private readonly userUpdateHandler: IUserUpdateHandler,
    private readonly userFindOneHandler: IUserFindOneHandler,
    private readonly userFindManyHandler: IUserFindManyHandler,
  ) {}

  create(command: UserCreateCommand): Observable<{ id: string }> {
    return this.userCreateHandler.execute(command);
  }

  findMany(command: UserFindManyCommand): Observable<Array<IUser>> {
    return this.userFindManyHandler.execute(command);
  }

  findOne(command: UserFindOneCommand): Observable<IUser> {
    return this.userFindOneHandler.execute(command);
  }

  update(command: UserUpdateCommand): Observable<void> {
    return this.userUpdateHandler.execute(command);
  }

  delete(command: UserDeleteCommand): Observable<void> {
    return this.userDeleteHandler.execute(command);
  }
}
