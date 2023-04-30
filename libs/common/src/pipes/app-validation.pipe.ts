import { ValidationPipe } from '@nestjs/common';

export class AppValidationPipe extends ValidationPipe {
  public constructor() {
    super({
      transform: true,
      whitelist: false,
    });
  }
}
