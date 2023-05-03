import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { UserDeleteCommand } from './user-delete.command';

@Injectable()
export class UserDeleteHandler {
  constructor(
    @Inject(ServiceNameEnum.USERS) private readonly usersClient: ClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  delete(command: UserDeleteCommand): Observable<void> {
    this.logger.debug(command, `Processing Delete User`);

    return this.usersClient.send<void, UserDeleteCommand>(
      { cmd: UsersCommandPatternEnum.USER_DELETE },
      new UserDeleteCommand({
        id: command.id,
      }),
    );
  }
}
