import { Inject, Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UserCreateCommand } from './user-create.command';
import { UserFixture } from '../../domain/entity-fixtures';
import { IUsersCommandRepository, UserCreatedEvent } from '../../domain';
import { RpcException } from '@nestjs/microservices';
import { IClientProxy, UsersEventPatternEnum, ServiceNameEnum } from '@app/microservices';
import { IUser } from '@app/ddd';

@Injectable()
export class UserCreateHandler {
  constructor(
    private readonly usersCommandRepository: IUsersCommandRepository,
    private logger: PinoLogger,
    @Inject(ServiceNameEnum.RABBIT_MQ) private readonly rabbitMqClient: IClientProxy,
  ) {
    logger.setContext(this.constructor.name);
  }

  async create(command: UserCreateCommand): Promise<{ id: string }> {
    this.logger.debug(command, `Processing Create User`);

    const exist = await this.usersCommandRepository.findOne({
      where: [
        { username: command.username },
        {
          email: command.email,
        },
      ],
    });

    if (exist) {
      throw new RpcException({
        statusCode: 409,
        message: 'User for given email or username already exists!',
      });
    }

    const user = UserFixture.create(command);

    await this.usersCommandRepository.save(user);

    // EMit to Rabbig Mq
    this.rabbitMqClient.emit<UsersEventPatternEnum, IUser>(
      UsersEventPatternEnum.USER_CREATED,
      new UserCreatedEvent({
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }),
    );

    return { id: user.id };
  }
}
