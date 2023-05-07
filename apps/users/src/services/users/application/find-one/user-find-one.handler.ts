import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { IUser } from '@app/ddd';
import { UserFindOneCommand } from './user-find-one.command';
import { IUsersQueryRepository } from '../../domain';
import { EntityId } from '../../../../core';

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

    const entityId = EntityId.create(command.id);
    const departmentId = EntityId.create(command.departmentId);

    const user = await this.usersQueryRepository.findOne({
      where: { id: entityId.value, departmentId: departmentId.value },
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
