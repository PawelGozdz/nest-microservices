import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUsersService } from '../domain/users-service.interface';
import {
  UserCreateCommand,
  UserCreateHandler,
  UserDeleteCommand,
  UserDeleteHandler,
  UserFindManyCommand,
  UserFindManyHandler,
  UserFindOneCommand,
  UserFindOneHandler,
  UserUpdateCommand,
  UserUpdateHandler,
} from '../application';
import { IUser } from '@app/ddd';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(UserCreateHandler) private readonly userCreateHandler: UserCreateHandler,
    @Inject(UserDeleteHandler) private readonly userDeleteHandler: UserDeleteHandler,
    @Inject(UserUpdateHandler) private readonly userUpdateHandler: UserUpdateHandler,
    @Inject(UserFindOneHandler) private readonly userFindOneHandler: UserFindOneHandler,
    @Inject(UserFindManyHandler) private readonly userFindManyHandler: UserFindManyHandler,
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
