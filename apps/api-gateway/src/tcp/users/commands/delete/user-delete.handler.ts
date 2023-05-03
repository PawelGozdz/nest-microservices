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

  delete(id: string): Observable<void> {
    this.logger.debug({ id }, `Processing Delete User`);

    return this.usersClient.send<void, UserDeleteCommand>(
      { cmd: UsersCommandPatternEnum.USER_DELETE },
      new UserDeleteCommand({
        id,
      }),
    );
  }
}
