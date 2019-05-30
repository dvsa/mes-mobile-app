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
    return this.appConfigProvider.getAppConfig().logsApiUrl;
  }

  getLogsServiceApiKey(): any {
    return this.appConfigProvider.getAppConfig().logsPostApiKey;
  }

  getTestResultServiceUrl(): any {
    return this.appConfigProvider.getAppConfig().tests.testSubmissionUrl;
  }

}
