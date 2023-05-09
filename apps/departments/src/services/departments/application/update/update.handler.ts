import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { DepartmentUpdateCommand } from './update.command';
import { IDepartmentUpdateHandler, IDepartmentsCommandRepository } from '../../domain';
import { EntityId } from '../../../../core';

@Injectable()
export class DepartmentUpdateHandler implements IDepartmentUpdateHandler {
  constructor(
    private readonly departmentsCommandRepository: IDepartmentsCommandRepository,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  async execute(command: DepartmentUpdateCommand): Promise<void> {
    this.logger.debug(command, `Processing Update`);

    const entityId = EntityId.create(command.id);

    const exist = await this.departmentsCommandRepository.findOne({
      where: { name: command.name },
    });

    if (exist && exist.id !== entityId.value) {
      throw new RpcException({
        statusCode: 409,
        message: 'Departmen with a given name already exists!',
      });
    }

    const entity = await this.departmentsCommandRepository.findOne({
      where: { id: entityId.value },
    });

    if (!entity) {
      throw new RpcException({
        statusCode: 404,
        message: 'Department not found!',
      });
    }

    entity.name = command.name ?? entity.name;
    entity.updatedAt = new Date();

    await this.departmentsCommandRepository.update(entity.id, entity);

    return;
  }
}
