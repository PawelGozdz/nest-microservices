import { Module } from '@nestjs/common';
import { IClientProxy, ServiceNameEnum } from '@app/microservices';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import {
  DepartmentCreateHandler,
  DepartmentDeleteHandler,
  DepartmentFindManyHandler,
  DepartmentFindOneHandler,
  DepartmentUpdateHandler,
} from '../application';
import { IDepartmentsService } from '../domain/departments-service.interface';
import { EnvConfig } from '../../../config';
import {
  IDepartmentCreateHandler,
  IDepartmentDeleteHandler,
  IDepartmentFindManyHandler,
  IDepartmentFindOneHandler,
  IDepartmentUpdateHandler,
} from '../domain';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ServiceNameEnum.DEPARTMENTS,
        useFactory: (config: ConfigService<EnvConfig>) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('DEPARTMENTS_HOST'),
            port: config.get('DEPARTMENTS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [DepartmentsController],
  providers: [
    {
      provide: IDepartmentsService,
      useClass: DepartmentsService,
    },
    {
      provide: IClientProxy,
      useValue: ClientProxy,
    },
    {
      provide: IDepartmentCreateHandler,
      useClass: DepartmentCreateHandler,
    },
    {
      provide: IDepartmentDeleteHandler,
      useClass: DepartmentDeleteHandler,
    },
    {
      provide: IDepartmentFindOneHandler,
      useClass: DepartmentFindOneHandler,
    },
    {
      provide: IDepartmentFindManyHandler,
      useClass: DepartmentFindManyHandler,
    },
    {
      provide: IDepartmentUpdateHandler,
      useClass: DepartmentUpdateHandler,
    },
  ],
  exports: [],
})
export class DepartmentsModule {}
