import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceNameEnum } from '@app/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ServiceNameEnum.USERS,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3112,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
