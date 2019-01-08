import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import moment from 'moment';

@Injectable()
export class JournalProvider {

  constructor(public http: HttpClient, public appConfig: AppConfigProvider) {}

  getJournal(lastRefreshed: Date){
    let get$;
    if (lastRefreshed === null) {
      get$ = this.http.get(this.appConfig.getAppConfig().journal.journalUrl);
    } else {
      const modifiedSinceValue = moment(lastRefreshed).format('ddd[,] D MMM YYYY HH:mm:ss [GMT]');
      const options = {
        headers: new HttpHeaders().set('If-Modified-Since', modifiedSinceValue),
      };
      get$ = this.http.get(this.appConfig.getAppConfig().journal.journalUrl, options);
    }
    return get$;
  }

}
