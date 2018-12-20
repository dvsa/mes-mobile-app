import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';

@Injectable()
export class JournalProvider {

  constructor(public http: HttpClient, public appConfig: AppConfigProvider) {}

  getJournal(){
    return this.http.get(this.appConfig.getAppConfig().journal.journalUrl);
  }

  extractJournalData(data) {
    const journalData = data.testSlot;
    return journalData;
  }

}
