import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Observable } from 'rxjs';
import { UserCreateHandler } from './commands/create/user-create.handler';
import { UserDeleteHandler } from './commands/delete/user-delete.handler';
import { UserFindManyHandler, UserFindOneHandler, UserUpdateHandler } from './commands';
import { FindManyUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserCreateHandler) private readonly userCreateHandler: UserCreateHandler,
    @Inject(UserDeleteHandler) private readonly userDeleteHandler: UserDeleteHandler,
    @Inject(UserUpdateHandler) private readonly userUpdateHandler: UserUpdateHandler,
    @Inject(UserFindOneHandler) private readonly userFindOneHandler: UserFindOneHandler,
    @Inject(UserFindManyHandler) private readonly userFindManyHandler: UserFindManyHandler,
  ) {}

  create(command: CreateUserDto): Observable<{ id: string }> {
    return this.userCreateHandler.create(command);
  }

  findMany(command: FindManyUserDto): Observable<any> {
    return this.userFindManyHandler.findMany(command);
  }

  findOne(id: string): Observable<any> {
    return this.userFindOneHandler.findOne(id);
  }

  update(id: string, command: UpdateUserDto): Observable<any> {
    return this.userUpdateHandler.update(id, command);
  }

  remove(id: string): Observable<void> {
    return this.userDeleteHandler.remove(id);
  }
}
