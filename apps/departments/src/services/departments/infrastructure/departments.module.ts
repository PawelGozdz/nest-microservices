import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IClientProxy, ServiceNameEnum, UsersEventPatternEnum } from '@app/microservices';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import {
  DepartmentCreateHandler,
  DepartmentDeleteHandler,
  DepartmentFindManyHandler,
  DepartmentFindOneHandler,
  DepartmentUpdateHandler,
} from '../application';
import {
  IDepartmentDeleteHandler,
  IDepartmentUpdateHandler,
  IDepartmentCreateHandler,
  IDepartmentFindOneHandler,
  IDepartmentFindManyHandler,
  IDepartmentsService,
  IDepartmentsQueryRepository,
  IDepartmentsCommandRepository,
} from '../domain';
import { DepartmentsCommandRepository, DepartmentsQueryRepository } from './repositories';
import { DepartmentEntity } from './entities';
import { EnvConfig } from '../../../config';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentEntity]),
    ClientsModule.registerAsync([
      {
        name: ServiceNameEnum.RABBIT_MQ,
        useFactory: (configService: ConfigService<EnvConfig, true>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URI')],
            queue: UsersEventPatternEnum.USER_CREATED,
            noAck: false,
            persistent: true,
          },
        }),
        inject: [ConfigService],
      },
      {
        name: ServiceNameEnum.RABBIT_MQ,
        useFactory: (configService: ConfigService<EnvConfig, true>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URI')],
            queue: UsersEventPatternEnum.USER_UPDATED,
            noAck: false,
            persistent: true,
          },
        }),
        inject: [ConfigService],
      },
      {
        name: ServiceNameEnum.RABBIT_MQ,
        useFactory: (configService: ConfigService<EnvConfig, true>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URI')],
            queue: UsersEventPatternEnum.USER_DELETED,
            noAck: false,
            persistent: true,
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
      provide: IDepartmentCreateHandler,
      useClass: DepartmentCreateHandler,
    },
    {
      provide: IDepartmentUpdateHandler,
      useClass: DepartmentUpdateHandler,
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
      provide: IDepartmentsQueryRepository,
      useClass: DepartmentsQueryRepository,
    },
    {
      provide: IDepartmentsCommandRepository,
      useClass: DepartmentsCommandRepository,
    },
    {
      provide: IClientProxy,
      useValue: ClientProxy,
    },
  ],
})
export class DepartmentsModule {}
