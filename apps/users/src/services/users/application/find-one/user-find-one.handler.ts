import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UserFindOneCommand } from './user-find-one.command';
import { IUser } from '@app/ddd';
import { IUsersQueryRepository } from '../../domain';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserFindOneHandler {
  constructor(
    private readonly usersQueryRepository: IUsersQueryRepository,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  async findOne(command: UserFindOneCommand): Promise<IUser> {
    this.logger.debug(command, `Processing Find One`);

    const user = await this.usersQueryRepository.findOne({
      where: { id: command.id },
    });

    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found!',
      });
    }

    return user;
  }
}
