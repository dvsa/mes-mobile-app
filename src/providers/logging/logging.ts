import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from './logging.constants';
import { UrlProvider } from '../url/url';


@Injectable()
export class LoggingProvider {

  constructor(public http: HttpClient, public urlProvider: UrlProvider ) {}

  public log = (log: Log): void => {
    this.logMultiple([log]);
  }

  public logMultiple = (logs : Log[]): void => {
    this.http
      .post(this.urlProvider.getLoggingServiceUrl(), logs)
      .subscribe(error => this.handleError(error))
      .unsubscribe();
  }

  private handleError = (error: any) => {
    // TODO - Handle offline mode/retries
    console.log('Logging Service Error' , error);
  }
}
