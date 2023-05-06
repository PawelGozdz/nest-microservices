import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UserDeleteCommand } from './user-delete.command';
import { IUsersCommandRepository } from '../../domain';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserDeleteHandler {
  constructor(
    private readonly usersCommandRepository: IUsersCommandRepository,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  async delete(command: UserDeleteCommand): Promise<void> {
    this.logger.debug(command, `Processing Delete User`);

    const user = await this.usersCommandRepository.findOne({ where: { id: command.id } });

    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found!',
      });
    }

    await this.usersCommandRepository.delete(user.id);

    // Emit to Rabbit Mq

    return;
  }
}
