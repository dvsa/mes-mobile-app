import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';
import { AdvancedSearchParams } from './search.models';

@Injectable()
export class SearchProvider {

  constructor(
    private http: HttpClient,
    private urlProvider : UrlProvider,
  ) {}

  driverNumberSearch(driverNumber: string): Observable<any> {
    return this.http.get(
      this.urlProvider.getTestResultServiceUrl(),
      {
        params: {
          driverNumber,
          isLDTM: 'false',
        },
      },
    );
  }

  applicationReferenceSearch(applicationReference: string): Observable<any> {
    return this.http.get(
      this.urlProvider.getTestResultServiceUrl(),
      {
        params: {
          applicationReference,
          isLDTM: 'false',
        },
      },
    );
  }

  advancedSearch(advancedSearchParams: AdvancedSearchParams): Observable<any> {
    return this.http.get(
      this.urlProvider.getTestResultServiceUrl(),
      {
        params: {
          // TODO -  remove this when https://jira.i-env.net/browse/MES-2135 is implemented
          isLDTM: advancedSearchParams.isLDTM ? 'true' : 'false',
          startDate: advancedSearchParams.startDate,
          endDate: advancedSearchParams.endDate,
          staffNumber: advancedSearchParams.staffNumber,
          dtcCode: advancedSearchParams.costCode,
        },
      },
    );
  }

  getTestResult(applicationReference: string, staffNumber: string): Observable<any> {
    return this.http.get(
      this.urlProvider.getTestResultServiceUrl().concat(`/${applicationReference}/${staffNumber}`),
    );
  }
}
