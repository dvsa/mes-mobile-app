import { Injectable } from '@angular/core';
import { RekeySearchParams } from './rekey-search.model';
import { HttpClient } from '@angular/common/http';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs';

@Injectable()
export class RekeySearchProvider {

  constructor(
    private httpClient: HttpClient,
    private urlProvider: UrlProvider,
  ) { }

  getBooking(rekeySearchParams: RekeySearchParams): Observable<Object> {
    return this.httpClient.get(
      this.urlProvider.getRekeySearchUrl(rekeySearchParams.staffNumber),
      {
        params: {
          appRef: rekeySearchParams.applicationReference,
        },
      },
    );
  }

}
