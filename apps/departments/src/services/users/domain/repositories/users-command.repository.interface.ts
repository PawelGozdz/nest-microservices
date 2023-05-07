import { IUser } from '@app/ddd';

export abstract class IUsersCommandRepository {
  abstract findOne(query: any): Promise<IUser | undefined>;
  abstract save(user: IUser): Promise<IUser>;
  abstract update(id: string, user: IUser): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
