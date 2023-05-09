import { IUserCreateCommand } from '@app/microservices';
import { Observable } from 'rxjs';

export abstract class IUserCreateHandler {
  abstract execute(command: IUserCreateCommand): Observable<{ id: string }>;
}
