import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
// import { HealthMetricsModule } from './health-metrics.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  // const healthMetricsApp = await NestFactory.create(HealthMetricsModule);
  await app.listen(3000);
}
bootstrap();
