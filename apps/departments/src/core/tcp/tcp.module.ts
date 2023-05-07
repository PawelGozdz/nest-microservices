import { Module } from '@nestjs/common';
import { TcpUsersService } from './tcp-users.service';

@Module({
  providers: [TcpUsersService],
  exports: [TcpUsersService],
})
export class TcpModule {}
