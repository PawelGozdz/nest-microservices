import { IUser } from '@app/ddd';
import { EntityId } from '../../../../core/value-objects';

export class UserFixture implements IUser {
  id: string;
  departmentId: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    departmentId: string,
    email: string,
    username: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.departmentId = departmentId;
    this.email = email;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({
    id,
    departmentId,
    email,
    username,
    createdAt,
    updatedAt,
  }: {
    id?: string;
    departmentId: string;
    email: string;
    username: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): IUser {
    const user = new UserFixture(
      id ? EntityId.create(id).value : EntityId.createRandom().value,
      EntityId.create(departmentId).value,
      email,
      username,
      createdAt,
      updatedAt,
    );

    return user;
  }
}
