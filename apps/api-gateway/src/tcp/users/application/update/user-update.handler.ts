import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from '@app/common';
import { UserUpdateCommand } from './user-update.command';
import { IUser } from '@app/ddd';
import { IClientProxy } from '../../domain';

@Injectable()
export class UserUpdateHandler {
  constructor(
    @Inject(ServiceNameEnum.USERS) private readonly usersClient: IClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  update(command: UserUpdateCommand): Observable<IUser> {
    this.logger.debug(command, `Processing Update User`);

    return this.usersClient.send<IUser, UserUpdateCommand>(
      { cmd: UsersCommandPatternEnum.USER_UPDATE },
      new UserUpdateCommand({
        email: command.email,
        username: command.username,
        id: command.id,
      }),
    );
  }
}
