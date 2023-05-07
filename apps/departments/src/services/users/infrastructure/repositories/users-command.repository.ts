import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersCommandRepository } from '../../domain';
import { UserEntity } from '../entities';
import { FindOneOptions, Repository } from 'typeorm';
import { IUser } from '@app/ddd';

@Injectable()
export class UsersCommandRepository implements IUsersCommandRepository {
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

  async save(user: IUser): Promise<IUser> {
    const createUser = this.usersRepository.create(user);

    await this.usersRepository.save(createUser);

    return this.mapResponse(createUser);
  }

  async update(id: string, user: IUser): Promise<void> {
    await this.usersRepository.update(
      {
        id,
      },
      user,
    );

    return;
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete({
      id,
    });

    return;
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
