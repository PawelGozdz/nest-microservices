import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { EnvConfig } from '../../config';

@Injectable()
export class TcpUsersService {
  constructor(private readonly configService: ConfigService<EnvConfig, true>) {}

  getOptions(): TcpOptions[] {
    return [
      {
        transport: Transport.TCP,
        options: {
          host: this.configService.get('USERS_HOST'),
          port: this.configService.get('USERS_PORT'),
        },
      },
    ];
  }
}
