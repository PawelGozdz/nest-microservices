import { Injectable } from '@nestjs/common';
import { IUser } from '@app/ddd';
import { IUsersQueryRepository } from '../../domain';
import { UserEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersQueryRepository implements IUsersQueryRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(query: FindOneOptions<UserEntity>) {
    const user = await this.usersRepository.findOne(query);

    if (!user) {
      return;
    }

    return this.mapResponse(user);
  }

  async findMany(query?: FindManyOptions<UserEntity>) {
    const users = await this.usersRepository.find(query);

    return users.map((u) => this.mapResponse(u));
  }

  mapResponse(user: UserEntity): IUser {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
