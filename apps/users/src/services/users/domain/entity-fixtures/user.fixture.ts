import { IUser } from '@app/ddd';
import { EntityId } from '../../../../infrastructure';

export class UserFixture implements IUser {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    username: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({
    id,
    email,
    username,
    createdAt,
    updatedAt,
  }: {
    id?: EntityId;
    email: string;
    username: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): IUser {
    const user = new UserFixture(
      id?.value ? EntityId.create(id.value).value : EntityId.createRandom().value,
      email,
      username,
      createdAt,
      updatedAt,
    );

    return user;
  }
}
