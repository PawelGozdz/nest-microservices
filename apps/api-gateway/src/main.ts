import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppValidationPipe } from '@app/common';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import { AppModule } from './app.module';
import { nestApplicationOptions } from './nest-app-configuration';

import { EnvConfig } from './config';
import { HttpExceptionFilter } from './core';
import { nestApplicationSecurityConfiguration } from './security';
import { DepartmentsModule, UsersModule } from './services';
import { SwaggerBuilder } from './swagger';

async function buildSwaggers(app: INestApplication) {
  await SwaggerBuilder.build(
    app,
    UsersModule,
    '/api/users/api-docs',
    'Users Service',
    'Rest API documentation of Users Service',
  );
  await SwaggerBuilder.build(
    app,
    DepartmentsModule,
    '/api/departments/api-docs',
    'Departments Service',
    'Rest API documentation of Departments Service',
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    ...nestApplicationOptions,
  });
  const config = app.get(ConfigService<EnvConfig>);
  app.useLogger(app.get(Logger));

  nestApplicationSecurityConfiguration(app);

  app.setGlobalPrefix('api');

  if (config.get<boolean>('USE_SWAGGER')) {
    await buildSwaggers(app);
  }

  if (config.get<boolean>('USE_COMPRESSION')) {
    app.use(compression());
  }

  app.useGlobalPipes(new AppValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.get('PORT')!);
}
bootstrap().catch((err) => {
  console.error(err, 'Error while bootstrapping an application');
  process.exit(1);
});
