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
        },
      },
    );
  }

  advancedSearch(advancedSearchParams: AdvancedSearchParams): Observable<any> {
    return this.http.get(
      this.urlProvider.getTestResultServiceUrl(),
      {
        params: {
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
