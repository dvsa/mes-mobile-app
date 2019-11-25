
import { of } from 'rxjs/observable/of';
import { bookedTestMockHash } from './booked-test.mock';
import { Observable } from 'rxjs/observable';
import { RekeySearchParams } from '../rekey-search.model';

export class RekeySearchProviderMock {

  getBooking(params: RekeySearchParams): Observable<any> {
    return of(bookedTestMockHash);
  }

}
