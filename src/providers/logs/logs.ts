import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from '../../shared/models/log.model';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LogsProvider {

  constructor(public http: HttpClient, public urlProvider: UrlProvider) { }

  public sendLogs = (logs: Log[]): Observable<Object> => {
    const logsServiceUrl = this.urlProvider.getLogsServiceUrl();
    return this.http.post(logsServiceUrl, logs);
  }
}
