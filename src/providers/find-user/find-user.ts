import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { AppConfigProvider } from '../app-config/app-config';

@Injectable()
export class FindUserProvider {

  constructor(
    private httpClient: HttpClient,
    private urlProvider: UrlProvider,
    private appConfig: AppConfigProvider,
  ) { }

  userExists(staffNumber: number): Observable<Object> {
    return this.httpClient.get(
      this.urlProvider.getRekeyFindUserUrl(staffNumber.toString()))
      .pipe(timeout(this.appConfig.getAppConfig().requestTimeout));
  }

}
