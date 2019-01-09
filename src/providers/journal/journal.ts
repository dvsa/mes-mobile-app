import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import moment from 'moment';

@Injectable()
export class JournalProvider {

  constructor(public http: HttpClient, public appConfig: AppConfigProvider) {}

  getJournal(lastRefreshed: Date){
    if (lastRefreshed === null) {
      return this.http.get(this.appConfig.getAppConfig().journal.journalUrl);
    }
    const modifiedSinceValue = moment(lastRefreshed).format('ddd[,] D MMM YYYY HH:mm:ss [GMT]');
    const options = {
      headers: new HttpHeaders().set('If-Modified-Since', modifiedSinceValue),
    };
    return this.http.get(this.appConfig.getAppConfig().journal.journalUrl, options);
  }

}
