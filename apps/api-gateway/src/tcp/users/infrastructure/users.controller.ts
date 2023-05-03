import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdDto } from './dto/id.dto';
import { RequiredBody } from '@app/common';
import {
  UserCreateCommand,
  UserDeleteCommand,
  UserFindManyCommand,
  UserFindOneCommand,
  UserUpdateCommand,
} from '../application';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@RequiredBody() dto: CreateUserDto) {
    return this.usersService.create(
      new UserCreateCommand({
        email: dto.email,
        username: dto.username,
      }),
    );
  }

  @Get()
  findAll() {
    return this.usersService.findMany(new UserFindManyCommand({}));
  }

  @Get(':id')
  findOne(@Param() paramDto: IdDto) {
    return this.usersService.findOne(
      new UserFindOneCommand({
        id: paramDto.id,
      }),
    );
  }

  @Patch(':id')
  update(@Param() paramDto: IdDto, @RequiredBody() dto: UpdateUserDto) {
    return this.usersService.update(
      new UserUpdateCommand({
        id: paramDto.id,
        email: dto.email,
        username: dto.username,
      }),
    );
  }

  @Delete(':id')
  async remove(@Param() dto: IdDto) {
    return this.usersService.delete(
      new UserDeleteCommand({
        id: dto.id,
      }),
    );
  }
}
