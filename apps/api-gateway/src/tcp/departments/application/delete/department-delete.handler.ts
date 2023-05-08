import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, IClientProxy, DepartmentsCommandPatternEnum } from '@app/microservices';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { DepartmentDeleteCommand } from './department-delete.command';

@Injectable()
export class DepartmentDeleteHandler {
  constructor(
    @Inject(ServiceNameEnum.DEPARTMENTS) private readonly client: IClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  delete(command: DepartmentDeleteCommand): Observable<void> {
    this.logger.debug(command, `Processing Delete Department`);

    return this.client.send<void, DepartmentDeleteCommand>(
      { cmd: DepartmentsCommandPatternEnum.DEPARTMENT_DELETE },
      new DepartmentDeleteCommand({
        id: command.id,
      }),
    );
  }
}
