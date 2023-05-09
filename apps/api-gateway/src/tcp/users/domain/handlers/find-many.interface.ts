import { IUser } from '@app/ddd';
import { IUserFindManyCommand } from '@app/microservices';
import { Observable } from 'rxjs';

export abstract class IUserFindManyHandler {
  abstract execute(command: IUserFindManyCommand): Observable<Array<IUser>>;
}
