import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
