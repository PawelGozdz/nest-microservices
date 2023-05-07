import { IUser } from '@app/ddd';

interface Id {
  id: string;
}

interface UserCreate {
  email: string;
  username: string;
}

interface UserUpdate {
  id: string;
  email?: string;
  username?: string;
}

export abstract class IUsersService {
  abstract create(dto: UserCreate): Promise<{ id: string }>;
  abstract update(dto: UserUpdate): Promise<void>;
  abstract delete(id: Id): Promise<void>;
  abstract findOne(id: Id): Promise<IUser>;
  abstract findMany(dto: any): Promise<Array<IUser>>;
}
