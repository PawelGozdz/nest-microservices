import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { UserCreateCommand } from './user-create.command';
import { CreateUserDto } from '../../dto';

@Injectable()
export class UserCreateHandler {
  constructor(
    @Inject(ServiceNameEnum.USERS) private readonly usersClient: ClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  create(command: CreateUserDto): Observable<{ id: string }> {
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
