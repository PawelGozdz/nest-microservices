import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { DepartmentDeleteCommand } from './delete.command';
import { IDepartmentDeleteHandler, IDepartmentsCommandRepository } from '../../domain';
import { EntityId } from '../../../../core';

@Injectable()
export class DepartmentDeleteHandler implements IDepartmentDeleteHandler {
  constructor(
    private readonly departmentsCommandRepository: IDepartmentsCommandRepository,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  async execute(command: DepartmentDeleteCommand): Promise<void> {
    this.logger.debug(command, `Processing Delete Department`);

    const entityId = EntityId.create(command.id);

    const entity = await this.departmentsCommandRepository.findOne({
      where: { id: entityId.value },
    });

    if (!entity) {
      throw new RpcException({
        statusCode: 404,
        message: 'Department not found!',
      });
    }

    await this.departmentsCommandRepository.delete(entity.id);

    return;
  }
}
