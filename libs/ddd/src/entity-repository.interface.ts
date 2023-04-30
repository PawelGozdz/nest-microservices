import { EntityId } from '@app/common';

export abstract class IRepository<T> {
  abstract save(member: T): Promise<void>;
  abstract getById(id: EntityId): Promise<T | undefined>;
}
