import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationProvider } from '../authentication/authentication';
import { UrlProvider } from '../url/url';
import { DateTime } from '../../shared/helpers/date-time';
import { ExaminerWorkSchedule } from '../../shared/models/DJournal';
import { Observable } from 'rxjs/Observable';
import { DataStoreProvider } from '../data-store/data-store';
import { of } from 'rxjs/observable/of';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';

@Injectable()
export class JournalProvider {

  constructor(
    public http: HttpClient,
    public urlProvider: UrlProvider,
    public authProvider: AuthenticationProvider,
    public dataStore: DataStoreProvider,
    public networkStateProvider: NetworkStateProvider,
  ) {}

  getJournal(lastRefreshed: Date): Observable<ExaminerWorkSchedule> {
    const staffNumber = this.authProvider.getEmployeeId();
    const journalUrl = this.urlProvider.getPersonalJournalUrl(staffNumber);
    const networkStatus = this.networkStateProvider.getNetworkState();
    if (lastRefreshed === null) {
      if (networkStatus === ConnectionStatus.ONLINE) {
        return this.http.get(journalUrl);
      }
      return this.getOfflineJournal();
    }

    const modifiedSinceValue = DateTime.at(lastRefreshed).format('ddd[,] D MMM YYYY HH:mm:ss [GMT]');
    const options = {
      headers: new HttpHeaders().set('If-Modified-Since', modifiedSinceValue),
    };
    if (networkStatus === ConnectionStatus.ONLINE) {
      return this.http.get(journalUrl, options);
    } 
    return this.getOfflineJournal();
  }

  getOfflineJournal(): Observable<ExaminerWorkSchedule> {
    return of(this.getAndConvertOfflineJournal());
  }

  getAndConvertOfflineJournal(): ExaminerWorkSchedule {
    let jsonString: string;
    this.dataStore.getItem('JOURNAL').then((response) => {
      jsonString = response;
    });
    return JSON.parse(jsonString);
  }
}
