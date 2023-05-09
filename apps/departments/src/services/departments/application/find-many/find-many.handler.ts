import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DepartmentFindManyCommand } from './find-many.command';
import { IDepartment } from '@app/ddd';
import { IDepartmentFindManyHandler, IDepartmentsQueryRepository } from '../../domain';

@Injectable()
export class DepartmentFindManyHandler implements IDepartmentFindManyHandler {
  constructor(
    private readonly departmentsQueryRepository: IDepartmentsQueryRepository,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  async execute(command: DepartmentFindManyCommand): Promise<IDepartment[]> {
    this.logger.debug(command, `Processing Find Many`);

    const entities = await this.departmentsQueryRepository.findMany();

    return entities;
  }
}
