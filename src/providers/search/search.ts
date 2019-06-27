import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';
import { AdvancedSearchParams } from './search.models';

@Injectable()
export class SearchProvider {

  constructor(
    public http: HttpClient,
    public urlProvider : UrlProvider,
  ) {}

  driverNumberSearch(driverNumber: string, isLDTM: boolean = false): Observable<any> {
    return this.http.get(
      this.urlProvider.getTestResultServiceUrl()
        .concat(`?driverNumber=${driverNumber}&isLDTM=${isLDTM}`),
    );
  }

  applicationReferenceSearch(applicationReference: string, isLDTM : boolean = false): Observable<any> {
    return this.http.get(
      this.urlProvider.getTestResultServiceUrl()
        .concat(`?applicationReference=${applicationReference}&isLDTM=${isLDTM}`),
    );
  }

  advancedSearch(advancedSearchParams: AdvancedSearchParams): Observable<any> {

    const httpParams: string [] = [];

    advancedSearchParams.isLDTM ?
     httpParams.push('isLDTM=true') : httpParams.push('isLDTM=false');

    if (advancedSearchParams.startDate) {
      httpParams.push(`startDate=${advancedSearchParams.startDate}`);
    }

    if (advancedSearchParams.endDate) {
      httpParams.push(`endDate=${advancedSearchParams.endDate}`);
    }

    if (advancedSearchParams.staffNumber) {
      httpParams.push(`staffNumber=${advancedSearchParams.staffNumber}`);
    }

    if (advancedSearchParams.costCode) {
      httpParams.push(`dtcCode=${advancedSearchParams.costCode}`);
    }

    return this.http.get(
      this.urlProvider.getTestResultServiceUrl()
        .concat(this.buildQueryString(httpParams)),
    );
  }

  private buildQueryString(parameters: string []): string {
    let queryString = '';

    parameters.forEach((param, index) => {
      if (index === 0) {
        queryString = queryString.concat(`?${param}`);
      } else {
        queryString = queryString.concat(`&${param}`);
      }
    });

    return queryString;
  }

}
