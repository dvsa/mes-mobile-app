
export const LOGGING_SERVICE_URL = 'https://www.example.com/api/v1/logs';

export class UrlProviderMock {

  getPersonalJournalUrl =
    jasmine.createSpy('getPersonalJournalUrl')
    .and
    .returnValue('https://www.example.com/api/v1/journals/12345678/personal');

  getLoggingServiceUrl =
      jasmine.createSpy('getLoggingServiceUrl')
      .and
      .returnValue(LOGGING_SERVICE_URL);

}
