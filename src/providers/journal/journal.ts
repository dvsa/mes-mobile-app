import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import moment from 'moment';

@Injectable()
export class JournalProvider {

  constructor(public http: HttpClient, public appConfig: AppConfigProvider) {}

  lastGet: Date;

  getJournal(){
    const prevGet = this.lastGet;
    this.lastGet = new Date();

    let get$;
    if (prevGet === undefined) {
      get$ = this.http.get(this.appConfig.getAppConfig().journal.journalUrl);
    } else {
      const options = {
        headers: new HttpHeaders().set('If-Modified-Since', `${moment(prevGet).format('ddd[,] D MMM YYYY HH:mm:ss [GMT]')}`),
      };
      get$ = this.http.get(this.appConfig.getAppConfig().journal.journalUrl, options);
    }
    return get$;
  }

}
