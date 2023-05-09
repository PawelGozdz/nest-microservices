import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UserFindManyCommand } from './find-many.command';
import { IUser } from '@app/ddd';
import { IUserFindManyHandler, IUsersQueryRepository } from '../../domain';
import { EntityId } from '../../../../core';

@Injectable()
export class UserFindManyHandler implements IUserFindManyHandler {
  constructor(
    private readonly usersQueryRepository: IUsersQueryRepository,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  async execute(command: UserFindManyCommand): Promise<IUser[]> {
    this.logger.debug(command, `Processing Find Many`);

    const departmentId = EntityId.create(command.departmentId);

    const users = await this.usersQueryRepository.findMany({
      where: {
        departmentId: departmentId.value,
      },
    });

    return users;
  }
}
