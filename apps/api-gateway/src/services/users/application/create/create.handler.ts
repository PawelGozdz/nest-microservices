import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, UsersCommandPatternEnum, IClientProxy } from '@app/microservices';
import { Observable } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import { UserCreateCommand } from './create.command';
import { IUserCreateHandler } from '../../domain';

@Injectable()
export class UserCreateHandler implements IUserCreateHandler {
  constructor(
    @Inject(ServiceNameEnum.USERS) private readonly client: IClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  execute(command: UserCreateCommand): Observable<{ id: string }> {
    this.logger.debug(command, `Processing Create User`);

    return this.client.send<{ id: string }, UserCreateCommand>(
      { cmd: UsersCommandPatternEnum.USER_CREATE },
      new UserCreateCommand({
        email: command.email,
        username: command.username,
        departmentId: command.departmentId,
      }),
    );
  }
}
