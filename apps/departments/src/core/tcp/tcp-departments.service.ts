import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { EnvConfig } from '../../config';

@Injectable()
export class TcpDepartmentsService {
  constructor(private readonly configService: ConfigService<EnvConfig, true>) {}

  getOptions(): TcpOptions[] {
    return [
      {
        transport: Transport.TCP,
        options: {
          host: this.configService.get('DEPARTMENTS_HOST'),
          port: this.configService.get('DEPARTMENTS_PORT'),
        },
      },
    ];
  }
}
