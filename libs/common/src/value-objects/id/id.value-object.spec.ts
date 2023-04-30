import { EntityId, InvalidValueError, MissingValueError } from '@app/common';
import { tryAct } from '@app/testing';

describe('Id Value Object', () => {
  it('should create proper id', () => {
    const entityId = EntityId.create('00000000-0000-0000-0000-000000000000');

    expect(entityId.value).toBe('00000000-0000-0000-0000-000000000000');
  });

  it('should throw assertion error if organization number is invalid', () => {
    const { error } = tryAct(() => EntityId.create('wrong'));

    expect(error).toBeDefined();
    expect(error).toEqual(new InvalidValueError('entity identifier', 'wrong', 'not a valid UUID'));
  });

  it('should throw assertion error if organization number is empty', () => {
    const { error } = tryAct(() => EntityId.create(''));

    expect(error).toBeDefined();
    expect(error).toEqual(new MissingValueError('entity identifier'));
  });
});
