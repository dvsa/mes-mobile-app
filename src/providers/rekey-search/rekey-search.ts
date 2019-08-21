import { Injectable } from '@angular/core';
import { RekeySearchParams } from './rekey-search.model';
// import { HttpClient } from '@angular/common/http';
// import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';
import { bookedTestMockHash } from './__mocks__/booked-test.mock';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RekeySearchProvider {

  constructor(
    // private httpClient: HttpClient,
    // private urlProvider: UrlProvider,
  ) { }

  getTest(rekeySearchParams: RekeySearchParams): Observable<Object> {
    return of(bookedTestMockHash);
    // return this.httpClient.get(
    //   this.urlProvider.getRekeySearchUrl(rekeySearchParams.staffNumber),
    //   {
    //     params: {
    //       appRef: rekeySearchParams.applicationReference,
    //     },
    //   },
    // );
  }

}
