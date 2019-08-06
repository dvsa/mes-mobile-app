import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RekeySearchParams } from './rekey-search.model';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RekeySearchProvider {

  constructor(
    private httpClient: HttpClient,
    private urlProvider: UrlProvider,
  ) { }

  getTest(rekeySearchParams: RekeySearchParams): Observable<any> {
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
