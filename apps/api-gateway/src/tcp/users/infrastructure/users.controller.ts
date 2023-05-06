import { Controller, Get, Post, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RequiredBody } from '@app/common';
import { CreateUserDto, CreateUserResponse } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdDto } from './dto/id.dto';
import {
  UserCreateCommand,
  UserDeleteCommand,
  UserFindManyCommand,
  UserFindOneCommand,
  UserUpdateCommand,
} from '../application';
import { IUsersService } from '../domain';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindOneUserResponse } from './dto';
import { Observable } from 'rxjs';

@ApiTags('API Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: IUsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: `Successfully created user`,
    type: [CreateUserResponse],
  })
  @Post()
  create(@RequiredBody() dto: CreateUserDto): Observable<CreateUserResponse> {
    return this.usersService.create(
      new UserCreateCommand({
        email: dto.email,
        username: dto.username,
      }),
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: `Successfully return multiple users data`,
    type: [FindOneUserResponse],
  })
  @Get()
  findAll(): Observable<FindOneUserResponse[]> {
    return this.usersService.findMany(new UserFindManyCommand());
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: `Successfully return user data`,
    type: FindOneUserResponse,
  })
  @Get(':id')
  findOne(@Param() paramDto: IdDto): Observable<FindOneUserResponse> {
    return this.usersService.findOne(
      new UserFindOneCommand({
        id: paramDto.id,
      }),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @Patch(':id')
  update(@Param() paramDto: IdDto, @RequiredBody() dto: UpdateUserDto): Observable<void> {
    return this.usersService.update(
      new UserUpdateCommand({
        id: paramDto.id,
        email: dto.email,
        username: dto.username,
      }),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @Delete(':id')
  delete(@Param() dto: IdDto): Observable<void> {
    return this.usersService.delete(
      new UserDeleteCommand({
        id: dto.id,
      }),
    );
  }
}
