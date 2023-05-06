import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UserUpdateCommand } from './user-update.command';
import { IUsersCommandRepository } from '../../domain';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserUpdateHandler {
  constructor(
    private readonly usersCommandRepository: IUsersCommandRepository,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  async update(command: UserUpdateCommand): Promise<void> {
    this.logger.debug(command, `Processing Update User`);

    const user = await this.usersCommandRepository.findOne({ where: { id: command.id } });

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

    return;
  }
}
