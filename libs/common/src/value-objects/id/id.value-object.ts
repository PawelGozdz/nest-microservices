import { v4 as uuidv4 } from 'uuid';

export class BaseEntityId {
  constructor(readonly value: string) {}

  static createRandom(): BaseEntityId {
    return new BaseEntityId(uuidv4());
  }

  equals(entityId: BaseEntityId) {
    return this.value === entityId.value;
  }
}
