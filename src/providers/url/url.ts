import { AppConfigProvider } from '../app-config/app-config';
import { Injectable } from '@angular/core';
import { isNil } from 'lodash';

@Injectable()
export class UrlProvider {

  constructor(
    public appConfigProvider: AppConfigProvider,
  ) { }

  getPersonalJournalUrl(staffNumber: string): any {
    const urlTemplate = this.appConfigProvider.getAppConfig().journal.journalUrl;
    return urlTemplate.replace('{staffNumber}', isNil(staffNumber) ? '00000000' : staffNumber);
  }

  getLogsServiceUrl(): any {
    return this.appConfigProvider.getAppConfig().logs.url;
  }

  getLogsServiceApiKey(): any {
    // todo use definition when john has merged in his api key changes
    // return this.appConfigProvider.getAppConfig().logs.apiKey;
    return 'API_KEY';
  }
  getTestResultServiceUrl(): any {
    return this.appConfigProvider.getAppConfig().tests.testSubmissionUrl;
  }

}
