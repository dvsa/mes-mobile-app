
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

export class FindUserProviderMock {
  constructor(
  ) { }

  userExists(staffNumber: string): Observable<Object> {
    return of();
  }
}
