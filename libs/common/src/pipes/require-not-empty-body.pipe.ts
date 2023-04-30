import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BadRequestError } from '@app/common';

@Injectable()
export class RequireNotEmptyBodyPipe implements PipeTransform {
  transform(body: Record<string, unknown>, _metadata: ArgumentMetadata) {
    const keysCount = Object.keys(body).length;
    if (keysCount === 0) {
      throw new BadRequestError('Request body cannot be empty!');
    }

    return body;
  }
}
