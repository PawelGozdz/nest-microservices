import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DepartmentsCommandPatternEnum } from '@app/microservices';
import { IDepartmentsService } from '../domain';
import {
  DepartmentCreateCommand,
  DepartmentDeleteCommand,
  DepartmentFindManyCommand,
  DepartmentFindOneCommand,
  DepartmentUpdateCommand,
} from '../application';

@Controller()
export class DepartmentsController {
  constructor(private readonly departmentsService: IDepartmentsService) {}

  @MessagePattern({ cmd: DepartmentsCommandPatternEnum.DEPARTMENT_CREATE })
  handleDepartmentCreate(@Payload() { name }: DepartmentCreateCommand) {
    return this.departmentsService.create({
      name,
    });
  }

  @MessagePattern({ cmd: DepartmentsCommandPatternEnum.DEPARTMENT_UPDATE })
  handleDepartmentUpdate(@Payload() { id, name }: DepartmentUpdateCommand) {
    return this.departmentsService.update({
      id,
      name,
    });
  }

  @MessagePattern({ cmd: DepartmentsCommandPatternEnum.DEPARTMENT_FIND_MANY })
  handleDepartmentFindMany(@Payload() command: DepartmentFindManyCommand) {
    return this.departmentsService.findMany(command);
  }

  @MessagePattern({ cmd: DepartmentsCommandPatternEnum.DEPARTMENT_FIND_ONE })
  handleDepartmentFindOne(@Payload() { id }: DepartmentFindOneCommand) {
    return this.departmentsService.findOne({
      id,
    });
  }

  @MessagePattern({ cmd: DepartmentsCommandPatternEnum.DEPARTMENT_DELETE })
  handleDepartmentDelete(@Payload() { id }: DepartmentDeleteCommand) {
    return this.departmentsService.delete({
      id,
    });
  }
}
