import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationProvider } from '../authentication/authentication';
import { UrlProvider } from '../url/url';
import { DateTime } from '../../shared/helpers/date-time';
import { ExaminerWorkSchedule } from '../../shared/models/DJournal';
import { Observable } from 'rxjs/Observable';
import { DataStoreProvider } from '../data-store/data-store';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';
import { from } from 'rxjs/observable/from';
import { AppConfigProvider } from '../app-config/app-config';

type JournalCache = {
  dateStored: string,
  data: ExaminerWorkSchedule,
};

@Injectable()
export class JournalProvider {
  constructor(
    public http: HttpClient,
    public urlProvider: UrlProvider,
    public authProvider: AuthenticationProvider,
    public dataStore: DataStoreProvider,
    public networkStateProvider: NetworkStateProvider,
    private appConfigProvider: AppConfigProvider,
  ) {}

  getJournal(lastRefreshed: Date): Observable<ExaminerWorkSchedule> {
    const staffNumber = this.authProvider.getEmployeeId();
    const journalUrl = this.urlProvider.getPersonalJournalUrl(staffNumber);
    const networkStatus = this.networkStateProvider.getNetworkState();
    if (lastRefreshed === null) {
      if (!this.authProvider.isInUnAuthenticatedMode() &&
      networkStatus === ConnectionStatus.ONLINE) {
        return this.http.get(journalUrl);
      }
      return this.getOfflineJournal();
    }

    const modifiedSinceValue = DateTime.at(lastRefreshed).format('ddd[,] D MMM YYYY HH:mm:ss [GMT]');
    const options = {
      headers: new HttpHeaders().set('If-Modified-Since', modifiedSinceValue),
    };
    if (!this.authProvider.isInUnAuthenticatedMode() && networkStatus === ConnectionStatus.ONLINE) {
      return this.http.get(journalUrl, options);
    }
    return this.getOfflineJournal();
  }

  getOfflineJournal(): Observable<ExaminerWorkSchedule> {
    return from(this.getAndConvertOfflineJournal());
  }

  getAndConvertOfflineJournal = (): Promise<ExaminerWorkSchedule> =>
    this.dataStore.getItem('JOURNAL')
      .then((data) => {
        const journalCache: JournalCache = JSON.parse(data);
        const cachedDate = DateTime.at(journalCache.dateStored);
        if (this.isCacheTooOld(cachedDate, new DateTime())) {
          return this.emptyCachedData();
        }
        return journalCache.data;
      })
      .catch(error => error)

  saveJournalForOffline = (journalData: ExaminerWorkSchedule) => {
    if (this.networkStateProvider.getNetworkState() === ConnectionStatus.ONLINE) {
      const journalDataToStore: JournalCache = {
        dateStored: DateTime.now().format('YYYY/MM/DD'),
        data: journalData,
      };
      this.dataStore.setItem('JOURNAL', JSON.stringify(journalDataToStore)).then((response) => {});
    }
  }

  isCacheTooOld = (dateStored: DateTime, now: DateTime):boolean => {
    return dateStored.daysDiff(now) > this.appConfigProvider.getAppConfig().daysToCacheJournalData;
  }

  emptyCachedData = () => {
    const emptyJournalData: ExaminerWorkSchedule = {};
    const journalDataToStore: JournalCache = {
      dateStored: DateTime.now().format('YYYY/MM/DD'),
      data: emptyJournalData,
    };
    this.dataStore.setItem('JOURNAL', JSON.stringify(journalDataToStore)).then(() => {});
    return emptyJournalData;
  }

}
