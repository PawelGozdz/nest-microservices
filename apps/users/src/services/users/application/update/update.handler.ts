import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { UserUpdateCommand } from './update.command';
import { IUserUpdateHandler, IUsersCommandRepository, UserUpdatedEvent } from '../../domain';
import { EntityId } from '../../../../core';
import { IClientProxy, UsersEventPatternEnum, ServiceNameEnum } from '@app/microservices';

@Injectable()
export class UserUpdateHandler implements IUserUpdateHandler {
  constructor(
    private readonly usersCommandRepository: IUsersCommandRepository,
    private logger: PinoLogger,
    @Inject(ServiceNameEnum.RABBIT_MQ) private readonly rabbitMqClient: IClientProxy,
  ) {
    logger.setContext(this.constructor.name);
  }

  async execute(command: UserUpdateCommand): Promise<void> {
    this.logger.debug(command, `Processing Update User`);

    const entityId = EntityId.create(command.id);

    const exist = await this.usersCommandRepository.findOne({
      where: [
        { username: command.username },
        {
          email: command.email,
        },
      ],
    });

    if (exist && exist.id !== entityId.value) {
      throw new RpcException({
        statusCode: 409,
        message: 'User for given email or username already exists!',
      });
    }

    const user = await this.usersCommandRepository.findOne({ where: { id: entityId.value } });

    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found!',
      });
    }

    const updatedDepartmentId =
      command.updatedDepartmentId && EntityId.create(command.updatedDepartmentId);

    user.email = command.email ?? user.email;
    user.username = command.username ?? user.username;
    user.departmentId = updatedDepartmentId ? updatedDepartmentId.value : user.departmentId;
    user.updatedAt = new Date();

    await this.usersCommandRepository.update(user.id, user);

    // Emit to Rabbit Mq
    this.rabbitMqClient.emit<UsersEventPatternEnum, { id: string; departmentId: string }>(
      UsersEventPatternEnum.USER_UPDATED,
      new UserUpdatedEvent({
        id: user.id,
        departmentId: user.departmentId,
      }),
    );

    return;
  }
}
