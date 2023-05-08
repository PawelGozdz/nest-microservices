import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DepartmentFindManyCommand } from './department-find-many.command';
import { IDepartment } from '@app/ddd';
import { IDepartmentsQueryRepository } from '../../domain';

@Injectable()
export class DepartmentFindManyHandler {
  constructor(
    private readonly departmentsQueryRepository: IDepartmentsQueryRepository,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  async findMany(command: DepartmentFindManyCommand): Promise<IDepartment[]> {
    this.logger.debug(command, `Processing Find Many`);

    const entities = await this.departmentsQueryRepository.findMany();

    return entities;
  }
}
