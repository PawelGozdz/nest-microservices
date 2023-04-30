import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export const nestApplicationSecurityConfiguration = (app: INestApplication) => {
  app.use(helmet());
};
