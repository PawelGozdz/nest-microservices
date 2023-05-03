import { IUser } from '@app/ddd';
import { Observable } from 'rxjs';

interface Id {
  id: string;
}

interface User {
  email: string;
  username: string;
}

interface UserUpdate {
  id: string;
  email?: string;
  username?: string;
}

export abstract class IUsersService {
  abstract create(dto: User): Observable<{ id: string }>;
  abstract update(dto: UserUpdate): Observable<any>;
  abstract delete(id: Id): Observable<void>;
  abstract findOne(id: Id): Observable<IUser>;
  abstract findMany(dto: any): Observable<Array<IUser>>;
}
