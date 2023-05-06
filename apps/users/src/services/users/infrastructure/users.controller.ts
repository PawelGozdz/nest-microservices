import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersCommandPatternEnum } from '@app/microservices';
import { IUsersService } from '../domain';
import {
  UserCreateCommand,
  UserDeleteCommand,
  UserFindManyCommand,
  UserFindOneCommand,
  UserUpdateCommand,
} from '../application';
import { EntityId } from '../../../core/value-objects';

@Controller()
export class UsersController {
  constructor(private readonly usersService: IUsersService) {}

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_CREATE })
  handleUserCreate(@Payload() { email, username }: UserCreateCommand) {
    return this.usersService.create({
      email,
      username,
    });
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_UPDATE })
  handleUserUpdate(@Payload() { id, username, email }: UserUpdateCommand) {
    return this.usersService.update({
      id: new EntityId(id),
      email,
      username,
    });
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_FIND_MANY })
  handleUserFindMany(@Payload() payload: UserFindManyCommand) {
    return this.usersService.findMany(payload);
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_FIND_ONE })
  handleUserFindOne(@Payload() { id }: UserFindOneCommand) {
    return this.usersService.findOne({
      id: new EntityId(id),
    });
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_DELETE })
  handleUserDelete(@Payload() { id }: UserDeleteCommand) {
    return this.usersService.delete({
      id: new EntityId(id),
    });
  }
}
