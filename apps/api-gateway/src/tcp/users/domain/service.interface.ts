import { IUser } from '@app/ddd';
import { Observable } from 'rxjs';

interface Id {
  id: string;
  departmentId: string;
}

interface User {
  email: string;
  username: string;
  departmentId: string;
}

interface UserUpdate {
  id: string;
  email?: string;
  username?: string;
  departmentId: string;
}

export abstract class IUsersService {
  abstract create(dto: User): Observable<{ id: string }>;
  abstract update(dto: UserUpdate): Observable<void>;
  abstract delete(id: Id): Observable<void>;
  abstract findOne(id: Id): Observable<IUser>;
  abstract findMany(dto: any): Observable<Array<IUser>>;
}
