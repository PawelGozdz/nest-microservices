import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, UsersCommandPatternEnum, IClientProxy } from '@app/microservices';
import { PinoLogger } from 'nestjs-pino';
import { UserUpdateCommand } from './update.command';
import { Observable } from 'rxjs';
import { IUserUpdateHandler } from '../../domain';

@Injectable()
export class UserUpdateHandler implements IUserUpdateHandler {
  constructor(
    @Inject(ServiceNameEnum.USERS) private readonly client: IClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  execute(command: UserUpdateCommand): Observable<void> {
    this.logger.debug(command, `Processing Update User`);

    return this.client.send<void, UserUpdateCommand>(
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
