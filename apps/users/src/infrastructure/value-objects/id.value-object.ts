import { BaseEntityId } from '@app/common';
import { RpcException } from '@nestjs/microservices';
import { isUUID } from 'class-validator';

export class EntityId extends BaseEntityId {
  static create(value: string): EntityId {
    if (!value) {
      throw new RpcException({ statusCode: 400, message: 'Missing entity identifier' });
    }
    if (!isUUID(value)) {
      throw new RpcException({
        statusCode: 400,
        message: `Entity identifier ${value} is not a valid UUID`,
      });
    }

    return new EntityId(value);
  }
}
