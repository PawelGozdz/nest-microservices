import { IUser } from '@app/ddd';

export abstract class IUsersQueryRepository {
  abstract findMany(queryOptions?: any): Promise<IUser[]>;
  abstract findOne(query: any): Promise<IUser | undefined>;
}
