import { Inject, Injectable } from '@nestjs/common';
import { ServiceNameEnum, IClientProxy, DepartmentsCommandPatternEnum } from '@app/microservices';
import { Observable } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import { DepartmentCreateCommand } from './create.command';

@Injectable()
export class DepartmentCreateHandler {
  constructor(
    @Inject(ServiceNameEnum.DEPARTMENTS) private readonly client: IClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  execute(command: DepartmentCreateCommand): Observable<{ id: string }> {
    this.logger.debug(command, `Processing Create Department`);

    return this.client.send<{ id: string }, DepartmentCreateCommand>(
      { cmd: DepartmentsCommandPatternEnum.DEPARTMENT_CREATE },
      new DepartmentCreateCommand({
        name: command.name,
      }),
    );
  }
}
