import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import { ServiceNameEnum, IClientProxy, DepartmentsCommandPatternEnum } from '@app/microservices';
import { IDepartment } from '@app/ddd';
import { DepartmentFindOneCommand } from './department-find-one.command';

@Injectable()
export class DepartmentFindOneHandler {
  constructor(
    @Inject(ServiceNameEnum.DEPARTMENTS) private readonly client: IClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  findOne(command: DepartmentFindOneCommand): Observable<IDepartment> {
    this.logger.debug(command, `Processing Find One`);

    return this.client.send<IDepartment, DepartmentFindOneCommand>(
      { cmd: DepartmentsCommandPatternEnum.DEPARTMENT_FIND_ONE },
      new DepartmentFindOneCommand({
        id: command.id,
      }),
    );
  }
}
