import { Injectable } from '@nestjs/common';
import { UserCreateCommand, UserFindManyCommand, UserUpdateCommand } from './commands';
import { EntityId } from '@app/common';
import { User } from './entities/user.entity';
import { of } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  private users: any[] = [];
  create(command: UserCreateCommand) {
    const user: User = {
      ...command,
      id: EntityId.createRandom().value,
    };
    this.users.push(user);
    return of({
      id: user.id,
    });
  }

  findAll(_: UserFindManyCommand) {
    return of(this.users);
  }

  findOne(id: string) {
    const user = this.users.find((u) => EntityId.create(id).equals(EntityId.create(u.id)));

    if (!user) {
      throw new RpcException({ message: 'User not found', statusCode: 404 });
    }

    return user;
  }

  update(command: UserUpdateCommand) {
    const user: User = this.users.find((u) =>
      EntityId.create(u.id).equals(EntityId.create(command.id)),
    );

    if (!user) {
      throw new RpcException({ message: 'User not found', statusCode: 404 });
    }

    user.username = command.username ?? user.username;
    user.email = command.email ?? user.email;

    return of(user);
  }

  delete(id: string) {
    const user: User = this.users.find((u) => EntityId.create(id).equals(EntityId.create(u.id)));

    if (!user) {
      throw new RpcException({ message: 'User not found', statusCode: 404 });
    }

    this.users = this.users.filter((u) => u !== user);
    return of(undefined);
  }
}
