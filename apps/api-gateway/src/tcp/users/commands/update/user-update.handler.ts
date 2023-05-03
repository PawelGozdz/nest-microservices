import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { UpdateUserDto } from '../../dto';
import { UserUpdateCommand } from './user-update.command';

@Injectable()
export class UserUpdateHandler {
  constructor(
    @Inject(ServiceNameEnum.USERS) private readonly usersClient: ClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  update(id: string, command: UpdateUserDto): Observable<void> {
    this.logger.debug(command, `Processing Update User`);

    return this.usersClient.send<void, UserUpdateCommand>(
      { cmd: UsersCommandPatternEnum.USER_UPDATE },
      new UserUpdateCommand({
        email: command.email,
        username: command.username,
        id,
      }),
    );
  }
}
