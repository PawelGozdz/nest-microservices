import { EntityId } from '@app/common';
import { tryAct } from '@app/testing';
import { BadRequestException } from '@nestjs/common';

describe('Id Value Object', () => {
  it('should create proper id', () => {
    const entityId = EntityId.create('00000000-0000-0000-0000-000000000000');

    expect(entityId.value).toBe('00000000-0000-0000-0000-000000000000');
  });

  it('should throw assertion error if organization number is invalid', () => {
    const wrongEntityId = 'wrong';
    const { error } = tryAct(() => EntityId.create(wrongEntityId));

    expect(error).toBeDefined();
    expect(error).toEqual(
      new BadRequestException(`Entity identifier ${wrongEntityId} is not a valid UUID`),
    );
  });

  it('should throw assertion error if organization number is empty', () => {
    const { error } = tryAct(() => EntityId.create(''));

    expect(error).toBeDefined();
    expect(error).toEqual(new BadRequestException('Missing entity identifier'));
  });
});
