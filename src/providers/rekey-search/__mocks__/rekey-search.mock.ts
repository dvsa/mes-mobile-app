
import { of } from 'rxjs/observable/of';
import { bookedTestMock } from './booked-test.mock';
import { Observable } from 'rxjs/observable';
import { RekeySearchParams } from '../rekey-search.model';

export class RekeySearchProviderMock {

  getTest(params: RekeySearchParams): Observable<any> {
    return of(bookedTestMock);
  }

}
