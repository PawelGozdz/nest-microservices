import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class RequireNotEmptyBodyPipe implements PipeTransform {
  transform(body: Record<string, unknown>, _metadata: ArgumentMetadata) {
    const keysCount = Object.keys(body).length;
    if (keysCount === 0) {
      throw new BadRequestException('Request body cannot be empty!');
    }

    return body;
  }
}
