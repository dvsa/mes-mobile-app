
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs';

export class FindUserProviderMock {
  constructor(
  ) { }

  userExists(staffNumber: string): Observable<Object> {
    return of();
  }
}
