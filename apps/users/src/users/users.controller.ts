import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersCommandPatternEnum } from '@app/microservices';
import {
  UserCreateCommand,
  UserDeleteCommand,
  UserFindManyCommand,
  UserFindOneCommand,
  UserUpdateCommand,
} from './commands';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_CREATE })
  handleUserCreate(@Payload() payload: UserCreateCommand) {
    return this.usersService.create(payload);
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_UPDATE })
  handleUserUpdate(@Payload() payload: UserUpdateCommand) {
    return this.usersService.update(payload);
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_FIND_MANY })
  handleUserFindMany(@Payload() payload: UserFindManyCommand) {
    return this.usersService.findAll(payload);
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_FIND_ONE })
  handleUserFindOne(@Payload() payload: UserFindOneCommand) {
    return this.usersService.findOne(payload.id);
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_DELETE })
  handleUserDelete(@Payload() payload: UserDeleteCommand) {
    return this.usersService.delete(payload.id);
  }
}
