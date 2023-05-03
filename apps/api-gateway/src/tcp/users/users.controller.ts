import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdDto } from './dto/id.dto';
import { RequiredBody } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findMany({});
  }

  @Get(':id')
  findOne(@Param() paramDto: IdDto) {
    return this.usersService.findOne(paramDto.id);
  }

  @Patch(':id')
  update(@Param() paramDto: IdDto, @RequiredBody() updateUserDto: UpdateUserDto) {
    return this.usersService.update(paramDto.id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param() dto: IdDto) {
    return this.usersService.remove(dto.id);
  }
}
