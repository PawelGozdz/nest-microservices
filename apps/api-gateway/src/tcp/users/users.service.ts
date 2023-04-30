import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserEvent, EventPatternEnum, ServiceNameEnum } from '@app/microservices';
import { ClientProxy } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class UsersService {
  constructor(
    @Inject(ServiceNameEnum.USERS) private readonly usersClient: ClientProxy,
    private logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name);
  }

  create(createUserDto: CreateUserDto) {
    this.logger.debug(createUserDto, `Processing Create User`);
    this.usersClient.emit(EventPatternEnum.USER_CREATED, new CreateUserEvent('test@test.com'));
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
