import { RequiredBody } from '@app/common';
import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  DepartmentCreateCommand,
  DepartmentDeleteCommand,
  DepartmentFindManyCommand,
  DepartmentFindOneCommand,
  DepartmentUpdateCommand,
} from '../../application';
import { IDepartmentsService } from '../../domain';
import { FindOneDepartmentResponse } from '../dto';
import { CreateDepartmentDto, CreateDepartmentResponse } from '../dto/create-department.dto';
import { IdDto } from '../dto/id.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';

@ApiTags('API Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: IDepartmentsService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: `Successfully created department`,
    type: [CreateDepartmentResponse],
  })
  @Post()
  create(@RequiredBody() dto: CreateDepartmentDto): Observable<CreateDepartmentResponse> {
    return this.departmentsService.create(
      new DepartmentCreateCommand({
        name: dto.name,
      }),
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: `Successfully return multiple departments data`,
    type: [FindOneDepartmentResponse],
  })
  @Get()
  findAll(): Observable<FindOneDepartmentResponse[]> {
    return this.departmentsService.findMany(new DepartmentFindManyCommand());
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: `Successfully return department data`,
    type: FindOneDepartmentResponse,
  })
  @Get(':id')
  findOne(@Param() paramDto: IdDto): Observable<FindOneDepartmentResponse> {
    return this.departmentsService.findOne(
      new DepartmentFindOneCommand({
        id: paramDto.id,
      }),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @Patch(':id')
  update(@Param() paramDto: IdDto, @RequiredBody() dto: UpdateDepartmentDto): Observable<void> {
    return this.departmentsService.update(
      new DepartmentUpdateCommand({
        id: paramDto.id,
        name: dto.name,
      }),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @Delete(':id')
  delete(@Param() paramDto: IdDto): Observable<void> {
    return this.departmentsService.delete(
      new DepartmentDeleteCommand({
        id: paramDto.id,
      }),
    );
  }
}
