import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';
import { Observable } from '@app/common';
import { PinoLogger } from 'nestjs-pino';
import { UserCreateCommand } from './user-create.command';
import { IClientProxy } from '../../domain';

@Injectable()
export class UserCreateHandler {
  constructor(
    @Inject(ServiceNameEnum.USERS) private readonly usersClient: IClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  create(command: UserCreateCommand): Observable<{ id: string }> {
    this.logger.debug(command, `Processing Create User`);

    return this.usersClient.send<{ id: string }, UserCreateCommand>(
      { cmd: UsersCommandPatternEnum.USER_CREATE },
      new UserCreateCommand({
        email: command.email,
        username: command.username,
      }),
    );
  }
}
