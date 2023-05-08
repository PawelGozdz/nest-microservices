import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DepartmentCreateCommand } from './department-create.command';
import { DepartmentFixture } from '../../domain/entity-fixtures';
import { IDepartmentsCommandRepository } from '../../domain';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class DepartmentCreateHandler {
  constructor(
    private readonly departmentsCommandRepository: IDepartmentsCommandRepository,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  async create(command: DepartmentCreateCommand): Promise<{ id: string }> {
    this.logger.debug(command, `Processing Create Department`);

    const exist = await this.departmentsCommandRepository.findOne({
      where: { name: command.name },
    });

    if (exist) {
      throw new RpcException({
        statusCode: 409,
        message: 'Department for given name already exists!',
      });
    }

    const entity = DepartmentFixture.create(command);

    await this.departmentsCommandRepository.save(entity);

    return { id: entity.id };
  }
}
