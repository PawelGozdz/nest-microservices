import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { nestApplicationOptions } from './nest-app-configuration';
import { AppValidationPipe, HttpExceptionFilter } from '@app/common';
import { config as configuration } from './config/config';
import { nestApplicationSecurityConfiguration } from './security-configuration';
import { INestApplication } from '@nestjs/common';
import { SwaggerBuilder } from './swagger-setup';
import { UsersModule } from './tcp/users/users.module';

async function buildSwaggers(app: INestApplication) {
  await SwaggerBuilder.build(
    app,
    UsersModule,
    '/users/api-docs',
    'Users Service',
    'Rest API documentation of EMS',
  );
}

async function bootstrap() {
  const config = configuration();

  const app = await NestFactory.create(AppModule, {
    ...nestApplicationOptions,
  });
  app.useLogger(app.get(Logger));

  nestApplicationSecurityConfiguration(app);

  await buildSwaggers(app);

  app.useGlobalPipes(new AppValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(+config.get('PORT'));
}
bootstrap().catch((err) => {
  console.error(err, 'Error while bootstrapping an application');
  process.exit(1);
});
