import { IUserDeleteCommand } from '@app/microservices';
import { Observable } from 'rxjs';

export abstract class IUserDeleteHandler {
  abstract execute(command: IUserDeleteCommand): Observable<void>;
}
