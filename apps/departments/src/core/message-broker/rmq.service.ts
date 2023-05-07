import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersEventPatternEnum } from '@app/microservices';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { EnvConfig } from '../../config';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService<EnvConfig, true>) {}

  getOptions(): RmqOptions[] {
    return [
      {
        transport: Transport.RMQ,
        options: {
          urls: [this.configService.get<string>('RABBIT_MQ_URI')],
          queue: UsersEventPatternEnum.USER_CREATED,
          noAck: false,
          persistent: true,
        },
      },
      {
        transport: Transport.RMQ,
        options: {
          urls: [this.configService.get<string>('RABBIT_MQ_URI')],
          queue: UsersEventPatternEnum.USER_UPDATED,
          noAck: false,
          persistent: true,
        },
      },
      {
        transport: Transport.RMQ,
        options: {
          urls: [this.configService.get<string>('RABBIT_MQ_URI')],
          queue: UsersEventPatternEnum.USER_DELETED,
          noAck: false,
          persistent: true,
        },
      },
    ];
  }
}
