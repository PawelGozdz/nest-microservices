import { Observable } from 'rxjs';

export abstract class IClientProxy {
  abstract send<TResult = any, TInput = any>(pattern: any, data: TInput): Observable<TResult>;
  abstract emit<TResult = any, TInput = any>(pattern: any, data: TInput): Observable<TResult>;
}
