export class UrlProviderMock {

  getPersonalJournalUrl =
    jasmine.createSpy('getPersonalJournalUrl')
    .and
    .returnValue('https://www.example.com/api/v1/journals/12345678/personal');

}
