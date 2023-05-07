import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { UserUpdateCommand } from './user-update.command';
import { IUsersCommandRepository, UserUpdatedEvent } from '../../domain';
import { EntityId } from '../../../../core';
import { IClientProxy, UsersEventPatternEnum, ServiceNameEnum } from '@app/microservices';
import { IUser } from '@app/ddd';

@Injectable()
export class UserUpdateHandler {
  constructor(
    private readonly usersCommandRepository: IUsersCommandRepository,
    private logger: PinoLogger,
    @Inject(ServiceNameEnum.RABBIT_MQ) private readonly rabbitMqClient: IClientProxy,
  ) {
    logger.setContext(this.constructor.name);
  }

  async update(command: UserUpdateCommand): Promise<void> {
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

    user.email = command.email ?? user.email;
    user.username = command.username ?? user.username;
    user.updatedAt = new Date();

    await this.usersCommandRepository.update(user.id, user);

    // Emit to Rabbit Mq
    this.rabbitMqClient.emit<UsersEventPatternEnum, IUser>(
      UsersEventPatternEnum.USER_UPDATED,
      new UserUpdatedEvent({
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }),
    );

    return;
  }
}
