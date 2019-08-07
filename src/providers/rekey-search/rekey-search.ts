import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RekeySearchParams } from './rekey-search.model';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';
import { TestSlot } from '@dvsa/mes-journal-schema';

@Injectable()
export class RekeySearchProvider {

  constructor(
    private httpClient: HttpClient,
    private urlProvider: UrlProvider,
  ) { }

  getTest(rekeySearchParams: RekeySearchParams): Observable<TestSlot> {
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
