import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { nestApplicationOptions } from './nest-app-configuration';
import { RmqService, TcpDepartmentsService } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    ...nestApplicationOptions,
  });

  const tcpDepartmentsService = app.get(TcpDepartmentsService);
  tcpDepartmentsService.getOptions().map((opt) => app.connectMicroservice(opt));

  const rmqService = app.get(RmqService);
  rmqService.getOptions().map((opt) => app.connectMicroservice(opt));

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();

  await app.startAllMicroservices();
}
bootstrap().catch((err) => {
  console.error(err, 'Error while bootstrapping an application');
  process.exit(1);
});
