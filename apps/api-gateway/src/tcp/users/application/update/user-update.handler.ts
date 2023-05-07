import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, UsersCommandPatternEnum, IClientProxy } from '@app/microservices';
import { PinoLogger } from 'nestjs-pino';
import { UserUpdateCommand } from './user-update.command';
import { Observable } from 'rxjs';

@Injectable()
export class UserUpdateHandler {
  constructor(
    @Inject(ServiceNameEnum.USERS) private readonly usersClient: IClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  update(command: UserUpdateCommand): Observable<void> {
    this.logger.debug(command, `Processing Update User`);

    return this.usersClient.send<void, UserUpdateCommand>(
      { cmd: UsersCommandPatternEnum.USER_UPDATE },
      new UserUpdateCommand({
        email: command.email,
        username: command.username,
        id: command.id,
        departmentId: command.departmentId,
        updatedDepartmentId: command.updatedDepartmentId,
      }),
    );
  }
}
