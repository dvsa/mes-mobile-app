import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import moment from 'moment';
import { AuthenticationProvider } from '../authentication/authentication';

@Injectable()
export class JournalProvider {

  constructor(
    public http: HttpClient,
    public appConfig: AppConfigProvider,
    public authProvider: AuthenticationProvider,
  ) {}

  getJournal(lastRefreshed: Date){
    const staffNumber = this.authProvider.getEmployeeId();
    const journalUrl = this.appConfig.getPersonalJournalUrl(staffNumber);

    if (lastRefreshed === null) {
      return this.http.get(journalUrl);
    }

    const modifiedSinceValue = moment(lastRefreshed).format('ddd[,] D MMM YYYY HH:mm:ss [GMT]');
    const options = {
      headers: new HttpHeaders().set('If-Modified-Since', modifiedSinceValue),
    };
    return this.http.get(journalUrl, options);
  }

}
