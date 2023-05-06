import { BaseEntityId } from '@app/common';
import { BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

export class EntityId extends BaseEntityId {
  static create(value: string): EntityId {
    if (!value) {
      throw new BadRequestException('Missing entity identifier');
    }

    if (!isUUID(value)) {
      throw new BadRequestException(`Entity identifier ${value} is not a valid UUID`);
    }

    return new EntityId(value);
  }
}
