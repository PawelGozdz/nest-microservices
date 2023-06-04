import { IUserUpdateCommand } from '@app/microservices';
import { Observable } from 'rxjs';

export abstract class IUserUpdateHandler {
  abstract execute(command: IUserUpdateCommand): Observable<void>;
}
