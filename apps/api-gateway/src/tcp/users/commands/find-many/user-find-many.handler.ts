import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { UserFindManyCommand } from './user-find-many.command';
import { FindManyUserDto } from '../../dto';

@Injectable()
export class UserFindManyHandler {
  constructor(
    @Inject(ServiceNameEnum.USERS) private readonly usersClient: ClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  findMany(_: FindManyUserDto): Observable<any> {
    this.logger.debug(`Processing Find Many`);

    return this.usersClient.send(
      { cmd: UsersCommandPatternEnum.USER_FIND_MANY },
      new UserFindManyCommand({}),
    );
  }
}
