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

@Controller()
export class UsersController {
  constructor(private readonly usersService: IUsersService) {}

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_CREATE })
  handleUserCreate(@Payload() { email, username, departmentId }: UserCreateCommand) {
    return this.usersService.create({
      email,
      username,
      departmentId,
    });
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_UPDATE })
  handleUserUpdate(
    @Payload() { id, username, email, departmentId, updatedDepartmentId }: UserUpdateCommand,
  ) {
    return this.usersService.update({
      id,
      email,
      username,
      departmentId,
      updatedDepartmentId,
    });
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_FIND_MANY })
  handleUserFindMany(@Payload() { departmentId }: UserFindManyCommand) {
    return this.usersService.findMany({
      departmentId,
    });
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_FIND_ONE })
  handleUserFindOne(@Payload() { id, departmentId }: UserFindOneCommand) {
    return this.usersService.findOne({
      id,
      departmentId,
    });
  }

  @MessagePattern({ cmd: UsersCommandPatternEnum.USER_DELETE })
  handleUserDelete(@Payload() { id, departmentId }: UserDeleteCommand) {
    return this.usersService.delete({
      id,
      departmentId,
    });
  }
}
