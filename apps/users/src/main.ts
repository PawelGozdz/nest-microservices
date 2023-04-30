import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  nestApplicationMicroserviceOptions,
  nestApplicationOptions,
} from '../nest-app-configuration';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    ...nestApplicationOptions,
    ...nestApplicationMicroserviceOptions,
  });
  app.enableShutdownHooks();

  await app.listen();
}
bootstrap().catch((err) => {
  console.error(err, 'Error while bootstrapping an application');
  process.exit(1);
});
