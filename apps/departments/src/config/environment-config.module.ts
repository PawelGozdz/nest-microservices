import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { validationSchema } from './validation';
import { EnvConfig } from './env-variable.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '/apps/departments/.env'),
      isGlobal: true,
      validationSchema,
      validationOptions: {
        abortEarly: false,
      },
    }),
  ],
  providers: [ConfigService<EnvConfig>],
})
export class EnvironmentConfigModule {}
