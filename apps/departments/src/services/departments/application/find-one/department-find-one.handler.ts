import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { IDepartment } from '@app/ddd';
import { DepartmentFindOneCommand } from './department-find-one.command';
import { IDepartmentsQueryRepository } from '../../domain';
import { EntityId } from '../../../../core';

@Injectable()
export class DepartmentFindOneHandler {
  constructor(
    private readonly departmentsQueryRepository: IDepartmentsQueryRepository,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  async findOne(command: DepartmentFindOneCommand): Promise<IDepartment> {
    this.logger.debug(command, `Processing Find One`);

    const entityId = EntityId.create(command.id);

    const entity = await this.departmentsQueryRepository.findOne({
      where: { id: entityId.value },
    });

    if (!entity) {
      throw new RpcException({
        statusCode: 404,
        message: 'Department not found!',
      });
    }

    return entity;
  }
}
