import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, IClientProxy, DepartmentsCommandPatternEnum } from '@app/microservices';
import { PinoLogger } from 'nestjs-pino';
import { DepartmentUpdateCommand } from './update.command';
import { Observable } from 'rxjs';

@Injectable()
export class DepartmentUpdateHandler {
  constructor(
    @Inject(ServiceNameEnum.DEPARTMENTS) private readonly client: IClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  execute(command: DepartmentUpdateCommand): Observable<void> {
    this.logger.debug(command, `Processing Update`);

    return this.client.send<void, DepartmentUpdateCommand>(
      { cmd: DepartmentsCommandPatternEnum.DEPARTMENT_UPDATE },
      new DepartmentUpdateCommand({
        name: command.name,
        id: command.id,
      }),
    );
  }
}
