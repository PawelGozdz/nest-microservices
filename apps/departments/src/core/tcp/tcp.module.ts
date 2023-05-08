import { Module } from '@nestjs/common';
import { TcpDepartmentsService } from './tcp-departments.service';

@Module({
  providers: [TcpDepartmentsService],
  exports: [TcpDepartmentsService],
})
export class TcpModule {}
