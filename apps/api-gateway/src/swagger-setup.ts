import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config';

const configService = config();

export class SwaggerBuilder {
  static async build(
    app: INestApplication,
    module: Function,
    path: string,
    title: string,
    description: string,
  ) {
    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(configService.get('APP_VERSION') as string);

    const document = SwaggerModule.createDocument(app, config.build(), {
      include: [module],
    });

    SwaggerModule.setup(path, app, document);
  }
}
