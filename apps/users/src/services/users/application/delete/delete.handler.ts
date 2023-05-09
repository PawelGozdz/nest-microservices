import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { UserDeleteCommand } from './delete.command';
import { IUserDeleteHandler, IUsersCommandRepository, UserDeletedEvent } from '../../domain';
import { EntityId } from '../../../../core';
import { IClientProxy, ServiceNameEnum, UsersEventPatternEnum } from '@app/microservices';

@Injectable()
export class UserDeleteHandler implements IUserDeleteHandler {
  constructor(
    private readonly usersCommandRepository: IUsersCommandRepository,
    private logger: PinoLogger,
    @Inject(ServiceNameEnum.RABBIT_MQ) private readonly client: IClientProxy,
  ) {
    logger.setContext(this.constructor.name);
  }

  async execute(command: UserDeleteCommand): Promise<void> {
    this.logger.debug(command, `Processing Delete User`);

    const entityId = EntityId.create(command.id);

    const user = await this.usersCommandRepository.findOne({
      where: { id: entityId.value, departmentId: command.departmentId },
    });

    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found!',
      });
    }

    await this.usersCommandRepository.delete(user.id);

    // Emit to Rabbit Mq
    this.client.emit<UsersEventPatternEnum, { id: string; departmentId: string }>(
      UsersEventPatternEnum.USER_DELETED,
      new UserDeletedEvent({
        id: user.id,
        departmentId: user.departmentId,
      }),
    );

    return;
  }
}
