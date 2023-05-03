import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { UserFindOneCommand } from './user-find-one.command';
import { IUser } from '@app/ddd';

@Injectable()
export class UserFindOneHandler {
  constructor(
    @Inject(ServiceNameEnum.USERS) private readonly usersClient: ClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  findOne(command: UserFindOneCommand): Observable<IUser> {
    this.logger.debug(command, `Processing Find One`);

    return this.usersClient.send<IUser, UserFindOneCommand>(
      { cmd: UsersCommandPatternEnum.USER_FIND_ONE },
      new UserFindOneCommand({
        id: command.id,
      }),
    );
  }
}
