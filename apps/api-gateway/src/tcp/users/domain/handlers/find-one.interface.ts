import { IUser } from '@app/ddd';
import { IUserFindOneCommand } from '@app/microservices';
import { Observable } from 'rxjs';

export abstract class IUserFindOneHandler {
  abstract execute(command: IUserFindOneCommand): Observable<IUser>;
}
