import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchProvider {

  constructor(
    public http: HttpClient,
    public urlProvider : UrlProvider,
  ) {}

  driverNumberSearch(driverNumber: string): Observable<any> {
    return this.http.get(
      this.urlProvider.getTestResultServiceUrl().concat(`?driverNumber=${driverNumber}`),
    );
  }

  applicationReferenceSearch(applicationReference: String): Observable<any> {
    return this.http.get(
      this.urlProvider.getTestResultServiceUrl().concat(`?applicationReference=${applicationReference}`),
    );
  }

  advancedSearch(
    isLDTM: boolean,
    startDate?: string,
    endDate?: string,
    staffNumber?: string,
    costCode?: string,
    ) {

    const httpParams: HttpParams = new HttpParams();

    isLDTM ?
    httpParams.set('isLDTM', 'true') :
    httpParams.set('isLDTM', 'false') ;

    if (startDate) {
      httpParams.set('startDate', startDate);
    }

    if (endDate) {
      httpParams.set('endDate', endDate);
    }

    if (staffNumber) {
      httpParams.set('staffNumber', staffNumber);
    }

    if (costCode) {
      httpParams.set('dtcCode', costCode);
    }

    return this.http.get(
      this.urlProvider.getTestResultServiceUrl(),
      {
        params: httpParams,
      },
    );
  }

}
