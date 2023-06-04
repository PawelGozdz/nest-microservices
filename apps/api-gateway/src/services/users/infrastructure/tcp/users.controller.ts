import { RequiredBody } from '@app/common';
import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  UserCreateCommand,
  UserDeleteCommand,
  UserFindManyCommand,
  UserFindOneCommand,
  UserUpdateCommand,
} from '../../application';
import { IUsersService } from '../../domain';
import { DepartmentIdDto, FindOneUserResponse } from '../dto';
import { CreateUserDto, CreateUserResponse } from '../dto/create-user.dto';
import { IdDto } from '../dto/id.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('API Users')
@Controller('departments/:departmentId/users')
export class UsersController {
  constructor(private readonly usersService: IUsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: `Successfully created user`,
    type: [CreateUserResponse],
  })
  @Post()
  create(
    @Param() paramDto: DepartmentIdDto,
    @RequiredBody() dto: CreateUserDto,
  ): Observable<CreateUserResponse> {
    return this.usersService.create(
      new UserCreateCommand({
        email: dto.email,
        username: dto.username,
        departmentId: paramDto.departmentId,
      }),
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: `Successfully return multiple users data`,
    type: [FindOneUserResponse],
  })
  @Get()
  findAll(@Param() paramDto: DepartmentIdDto): Observable<FindOneUserResponse[]> {
    return this.usersService.findMany(
      new UserFindManyCommand({
        departmentId: paramDto.departmentId,
      }),
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: `Successfully return user data`,
    type: FindOneUserResponse,
  })
  @Get(':id')
  findOne(
    @Param() paramDto: IdDto,
    @Param() param2Dto: DepartmentIdDto,
  ): Observable<FindOneUserResponse> {
    return this.usersService.findOne(
      new UserFindOneCommand({
        id: paramDto.id,
        departmentId: param2Dto.departmentId,
      }),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @Patch(':id')
  update(
    @Param() paramDto: IdDto,
    @Param() param2Dto: DepartmentIdDto,
    @RequiredBody() dto: UpdateUserDto,
  ): Observable<void> {
    return this.usersService.update(
      new UserUpdateCommand({
        id: paramDto.id,
        email: dto.email,
        username: dto.username,
        departmentId: param2Dto.departmentId,
        updatedDepartmentId: dto.updatedDepartmentId,
      }),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @Delete(':id')
  delete(@Param() paramDto: IdDto, @Param() param2Dto: DepartmentIdDto): Observable<void> {
    return this.usersService.delete(
      new UserDeleteCommand({
        id: paramDto.id,
        departmentId: param2Dto.departmentId,
      }),
    );
  }
}
