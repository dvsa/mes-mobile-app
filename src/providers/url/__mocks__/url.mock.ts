
export const LOGS_SERVICE_URL = 'https://www.example.com/api/v1/logs';

export class UrlProviderMock {

  getPersonalJournalUrl =
    jasmine.createSpy('getPersonalJournalUrl')
    .and
    .returnValue('https://www.example.com/api/v1/journals/12345678/personal');

  getLogsServiceUrl =
      jasmine.createSpy('getLogsServiceUrl')
      .and
      .returnValue(LOGS_SERVICE_URL);

}
