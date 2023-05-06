import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UserCreateCommand } from './user-create.command';
import { UserFixture } from '../../domain/entity-fixtures';
import { IUsersCommandRepository } from '../../domain';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserCreateHandler {
  constructor(
    private readonly usersCommandRepository: IUsersCommandRepository,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  async create(command: UserCreateCommand): Promise<{ id: string }> {
    this.logger.debug(command, `Processing Create User`);

    const exist = await this.usersCommandRepository.findOne({
      where: {
        username: command.username,
        email: command.email,
      },
    });

    if (exist) {
      throw new RpcException({
        statusCode: 409,
        message: 'User for given email or username already exists!',
      });
    }

    const user = UserFixture.create(command);

    await this.usersCommandRepository.save(user);

    return { id: user.id };
  }
}
