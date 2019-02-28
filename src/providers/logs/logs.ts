import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from '../../shared/models/log.model';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LogsProvider {

  constructor(public http: HttpClient, public urlProvider: UrlProvider) {}

  public log = (log: Log): Observable<Object> => {
    return this.logMultiple([log]);
  }

  public logMultiple = (logs : Log[]): Observable<Object> => {
    const loggingServiceUrl = this.urlProvider.getLoggingServiceUrl();
    return this.http.post(loggingServiceUrl, logs);
  }
}
